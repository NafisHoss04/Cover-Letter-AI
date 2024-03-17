import Workflow from "@/components/Workflow";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24 bg-slate-900 text-slate-200">
      <div className="container mx-auto">
        <Workflow />
      </div>
    </main>
  );
}
