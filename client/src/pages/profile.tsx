import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import Card from "../components/ui/Card"
import Input from "../components/ui/Input"
import Select from "../components/ui/Select"
import Button from "../components/ui/Button"
import { goalOptions } from "../assets/assets"
import strapiApi from "../services/strapiApi"
import toast from "react-hot-toast"
import KineticNoir from "./KineticNoir"

const Profile = () => {
  const { user, setUser } = useAppContext()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [editData, setEditData] = useState({
    age: user?.age ?? 0,
    weight: user?.weight ?? 0,
    height: user?.height ?? 0,
    goal: user?.goal ?? "maintain",
    dailyCalorieIntake: user?.dailyCalorieIntake ?? 2000,
    dailyCalorieBurn: user?.dailyCalorieBurn ?? 400,
  })

  const handleEdit = () => {
    setEditData({
      age: user?.age ?? 0,
      weight: user?.weight ?? 0,
      height: user?.height ?? 0,
      goal: user?.goal ?? "maintain",
      dailyCalorieIntake: user?.dailyCalorieIntake ?? 2000,
      dailyCalorieBurn: user?.dailyCalorieBurn ?? 400,
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!editData.age || !editData.weight || !editData.height) {
      toast.error("Age, weight and height are required")
      return
    }
    setIsSaving(true)
    try {
      const { data } = await strapiApi.user.update(user?.id ?? "", editData)
      setUser((prev) => prev ? { ...prev, ...data } : prev)
      setIsEditing(false)
      toast.success("Profile updated!")
    } catch {
      toast.error("Failed to update profile")
    }
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0f0e] transition-colors duration-200">
      {isEditing ? (
        <div className="p-6 max-w-2xl mx-auto pt-20">
          <Card className="bg-white dark:bg-[#141716] border-slate-200 dark:border-white/5 transition-colors shadow-sm dark:shadow-none">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-heading uppercase tracking-tight">Edit Kinetic Profile</h3>
            <div className="space-y-4">
              <Input label="Age" type="number" value={editData.age} onChange={(v) => setEditData({ ...editData, age: Number(v) })} placeholder="e.g. 25" min={1} required className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <Input label="Weight (kg)" type="number" value={editData.weight} onChange={(v) => setEditData({ ...editData, weight: Number(v) })} placeholder="e.g. 70" min={1} required className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <Input label="Height (cm)" type="number" value={editData.height} onChange={(v) => setEditData({ ...editData, height: Number(v) })} placeholder="e.g. 175" min={1} required className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <Select label="Goal" value={editData.goal} onChange={(v) => setEditData({ ...editData, goal: String(v) as typeof editData.goal })} options={goalOptions} required placeholder="Select your goal" className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <Input label="Daily Calorie Intake (kcal)" type="number" value={editData.dailyCalorieIntake} onChange={(v) => setEditData({ ...editData, dailyCalorieIntake: Number(v) })} placeholder="e.g. 2200" min={1} required className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <Input label="Daily Calorie Burn (kcal)" type="number" value={editData.dailyCalorieBurn} onChange={(v) => setEditData({ ...editData, dailyCalorieBurn: Number(v) })} placeholder="e.g. 400" min={1} required className="dark:bg-black/20 dark:border-white/10 text-slate-900 dark:text-white" />
              <div className="flex gap-3 pt-4">
                <Button className="bg-emerald-500 dark:bg-[#00ff6a] text-white dark:text-black hover:opacity-90 transition-all font-bold uppercase text-[10px] tracking-widest px-6" onClick={handleSave} disabled={isSaving}>{isSaving ? "Saving..." : "Save Changes"}</Button>
                <Button variant="secondary" className="border-slate-200 dark:border-white/10 text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-bold uppercase text-[10px] tracking-widest" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="relative">
          <KineticNoir onEdit={handleEdit} />
        </div>
      )}
    </div>
  )
}

export default Profile
