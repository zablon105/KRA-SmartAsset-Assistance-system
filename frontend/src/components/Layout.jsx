import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SmartAiAssistant from "./SmartAiAssistant";

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <TopBar title={title} subtitle={subtitle} />
        <main className="p-6">{children}</main>
      </div>
      <SmartAiAssistant />
    </div>
  );
}