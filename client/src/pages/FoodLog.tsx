import { useEffect, useRef, useState } from "react"
import { PlusIcon, Trash2Icon, UtensilsIcon, SparklesIcon, CameraIcon, XIcon } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import Card from "../components/ui/Card"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"
import Button from "../components/ui/Button"
import strapiApi from "../services/strapiApi"
import { mealTypeOptions, mealColors, mealIcons } from "../assets/assets"
import toast from "react-hot-toast"
import type { FormData } from "../types"
import { analyzeFoodSnap, analyzeFoodImage } from "../services/geminiService"

const FoodLog = () => {
  const { allFoodLogs, setAllFoodLogs, fetchFoodLogs } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSnapForm, setShowSnapForm] = useState(false)
  const [snapInput, setSnapInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showImageForm, setShowImageForm] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string>("")
  const [imageMime, setImageMime] = useState<string>("image/jpeg")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    calories: 0,
    mealType: "",
  })

  useEffect(() => {
    fetchFoodLogs()
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const todayLogs = allFoodLogs.filter((log) => log.date === today || log.createdAt?.split("T")[0] === today)
  const totalCalories = todayLogs.reduce((sum, item) => sum + item.calories, 0)

  const handleSubmit = async () => {
    if (!formData.name || !formData.calories || !formData.mealType) {
      toast.error("Please fill all fields")
      return
    }
    setIsSubmitting(true)
    try {
      const { data } = await strapiApi.foodLogs.create({ data: formData })
      setAllFoodLogs((prev) => [...prev, data])
      setFormData({ name: "", calories: 0, mealType: "" })
      setShowForm(false)
      toast.success("Food entry added!")
    } catch {
      toast.error("Failed to add entry")
    }
    setIsSubmitting(false)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return }
    setImageMime(file.type)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const result = ev.target?.result as string
      // result is data:image/jpeg;base64,<data>
      const base64 = result.split(",")[1]
      setImageBase64(base64)
      setImagePreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageAnalysis = async () => {
    if (!imageBase64) { toast.error("Please select an image first"); return }
    setIsAnalyzing(true)
    try {
      const result = await analyzeFoodImage(imageBase64, imageMime)
      setFormData({ name: result.name, calories: result.calories, mealType: formData.mealType })
      setShowImageForm(false)
      setImagePreview(null)
      setImageBase64("")
      setShowForm(true)
      const extras = result.protein ? ` | P: ${result.protein}g C: ${result.carbs}g F: ${result.fat}g` : ""
      toast.success(`Detected: ${result.name} (~${result.calories} kcal${extras})`)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Image analysis failed"
      toast.error(msg)
    }
    setIsAnalyzing(false)
  }

  const handleFoodSnap = async () => {
    if (!snapInput.trim()) {
      toast.error("Please describe the food")
      return
    }
    setIsAnalyzing(true)
    try {
      const result = await analyzeFoodSnap(snapInput)
      setFormData({ name: result.name, calories: result.calories, mealType: formData.mealType })
      setShowSnapForm(false)
      setSnapInput("")
      setShowForm(true)
      toast.success(`Detected: ${result.name} (~${result.calories} kcal)`)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "AI analysis failed"
      toast.error(msg)
    }
    setIsAnalyzing(false)
  }

  const handleDelete = async (documentId: string) => {
    try {
      await strapiApi.foodLogs.delete(documentId)
      setAllFoodLogs((prev) => prev.filter((f) => f.documentId !== documentId))
      toast.success("Entry deleted")
    } catch {
      toast.error("Failed to delete")
    }
  }

  // Group by meal type
  const grouped = todayLogs.reduce((acc, log) => {
    const type = log.mealType || "snack"
    if (!acc[type]) acc[type] = []
    acc[type].push(log)
    return acc
  }, {} as Record<string, typeof todayLogs>)

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Food Log</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track your daily nutrition</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <Button variant="secondary" onClick={() => { setShowImageForm(!showImageForm); setShowSnapForm(false); setShowForm(false) }} className="flex-1 sm:flex-none px-3! py-2!">
              <CameraIcon className="w-4 h-4" />
              <span className="inline">Photo</span>
            </Button>
            <Button variant="secondary" onClick={() => { setShowSnapForm(!showSnapForm); setShowImageForm(false); setShowForm(false) }} className="flex-1 sm:flex-none px-3! py-2!">
              <SparklesIcon className="w-4 h-4" />
              <span className="inline">AI Snap</span>
            </Button>
            <Button onClick={() => { setShowForm(!showForm); setShowSnapForm(false); setShowImageForm(false) }} className="flex-1 sm:flex-none px-3! py-2!">
              <PlusIcon className="w-5 h-5" />
              <span className="inline">Food</span>
            </Button>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="flex items-center gap-6 mt-5">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Today's Total</p>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{totalCalories} <span className="text-sm font-normal text-slate-400">kcal</span></p>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Meals</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{todayLogs.length}</p>
          </div>
        </div>
      </div>

      {/* Photo Food Analysis */}
      {showImageForm && (
        <div className="p-4 lg:p-6 lg:max-w-4xl mx-auto w-full">
          <Card className="overflow-hidden border-t-2 border-emerald-500">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <CameraIcon className="w-6 h-6 border-none" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-widest uppercase">PHOTO ANALYSIS</h3>
                </div>
                <button onClick={() => { setShowImageForm(false); setImagePreview(null); setImageBase64("") }} className="text-slate-400 hover:text-slate-600 p-2">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">Visual Intake Digitization</p>
              <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
              {!imagePreview ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-12 flex flex-col items-center gap-4 hover:border-emerald-500/50 hover:bg-emerald-500/[0.02] transition-all duration-300 cursor-pointer group"
                >
                  <CameraIcon className="w-12 h-12 text-slate-300 dark:text-white/20 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">ENGAGE OPTIC SENSOR</p>
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 shadow-2xl">
                    <img src={imagePreview} alt="Food preview" className="w-full max-h-80 object-cover" />
                    <button
                      onClick={() => { setImagePreview(null); setImageBase64(""); if (fileInputRef.current) fileInputRef.current.value = "" }}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white rounded-full p-2 hover:bg-red-500 transition-colors"
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleImageAnalysis} disabled={isAnalyzing} className="w-full sm:w-48 bg-emerald-500 text-black font-black uppercase text-xs tracking-widest h-12">
                      {isAnalyzing ? "PROCESSING..." : "PROCESS OPTICS"}
                    </Button>
                    <Button variant="secondary" onClick={() => fileInputRef.current?.click()} className="w-full sm:w-auto text-xs font-bold uppercase tracking-widest h-12">RE-CAPTURE</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* AI Food Snap Form */}
      {showSnapForm && (
        <div className="p-4 lg:p-6 lg:max-w-4xl mx-auto w-full">
          <Card className="border-t-2 border-emerald-500">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-widest uppercase">AI FOOD SNAP</h3>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">Semantic Consumption Input</p>
              <div className="space-y-6">
                <Input
                  label="Consumption Description"
                  value={snapInput}
                  onChange={(v) => setSnapInput(String(v))}
                  placeholder="e.g. 2 slices of pepperoni pizza, 1 glass of coke"
                  className="bg-slate-50 dark:bg-white/5 h-14"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleFoodSnap} disabled={isAnalyzing} className="w-full sm:w-48 bg-emerald-500 text-black font-black uppercase text-xs tracking-widest h-12">
                    {isAnalyzing ? "ANALYZING..." : "ANALYZE LOG"}
                  </Button>
                  <Button variant="secondary" onClick={() => { setShowSnapForm(false); setSnapInput("") }} className="w-full sm:w-auto text-xs font-bold uppercase tracking-widest h-12">ABORT</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Add Food Form */}
      {showForm && (
        <div className="p-4 lg:p-6 lg:max-w-4xl mx-auto w-full">
          <Card className="border-t-2 border-emerald-500">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-black text-slate-800 dark:text-white mb-8 tracking-widest uppercase">MANUAL ENTRY</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Input label="Identity" value={formData.name} onChange={(v) => setFormData({ ...formData, name: String(v) })} placeholder="e.g. Greek Yogurt Bowl" required className="bg-slate-50 dark:bg-white/5" />
                <Input label="Energy (kcal)" type="number" value={formData.calories} onChange={(v) => setFormData({ ...formData, calories: Number(v) })} placeholder="e.g. 250" min={1} required className="bg-slate-50 dark:bg-white/5" />
                <Select label="Classification" value={formData.mealType} onChange={(v) => setFormData({ ...formData, mealType: String(v) })} options={mealTypeOptions} required placeholder="Select Type" className="bg-slate-50 dark:bg-white/5" />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-48 bg-emerald-500 text-black font-black uppercase text-xs tracking-widest h-12">
                  {isSubmitting ? "UPLOADING..." : "COMMIT ENTRY"}
                </Button>
                <Button variant="secondary" onClick={() => setShowForm(false)} className="w-full sm:w-auto text-xs font-bold uppercase tracking-widest h-12">DISCARD</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Food Log List */}
      <div className="p-4 lg:p-6 lg:max-w-4xl mx-auto w-full space-y-6">
        {todayLogs.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10">
            <UtensilsIcon className="w-12 h-12 text-slate-300 dark:text-white/20 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm">Nutritional Void</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Zero caloric units recorded for current cycle.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([mealType, logs]) => {
            const MealIcon = mealIcons[mealType as keyof typeof mealIcons] || UtensilsIcon
            const colorClass = mealColors[mealType as keyof typeof mealColors] || "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
            const mealTotal = logs.reduce((sum, l) => sum + l.calories, 0)

            return (
              <div key={mealType} className="space-y-4">
                <div className="flex items-center justify-between pl-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} border border-slate-200 dark:border-white/5 shadow-sm`}>
                      <MealIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black text-slate-500 dark:text-emerald-500 uppercase tracking-[0.3em]">{mealType}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{logs.length} UNIT{logs.length > 1 ? "S" : ""}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-700 dark:text-white tracking-widest uppercase">{mealTotal} <span className="text-[10px] text-slate-400 font-normal">KCAL</span></p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {logs.map((log) => (
                    <Card key={log.id} className="group hover:border-emerald-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between p-1">
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-white leading-tight">{log.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{log.calories} KCAL</p>
                        </div>
                        {log.documentId && (
                          <button 
                            onClick={() => handleDelete(log.documentId!)} 
                            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-300 hover:text-red-500 transition-all duration-200"
                          >
                            <Trash2Icon className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default FoodLog
