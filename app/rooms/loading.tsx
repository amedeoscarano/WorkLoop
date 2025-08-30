'use client'

export default function RoomsLoading(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({length: 8}).map((_,i)=> (
        <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse h-28 shadow-md" />
      ))}
    </div>
  )
}

