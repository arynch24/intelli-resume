import NavBar from "@/components/dashboard/NavBar";

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className="h-screen">
            {/* Dashboard Navigation Bar */}
            <NavBar />

            {/* Main Content Area */}
            <div className="h-[calc(100vh-4.1rem)] flex w-full">
                <div className="w-full bg-zinc-50">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;
