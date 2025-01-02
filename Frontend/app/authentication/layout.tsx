
export default function AuthenticationLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col sm:justify-center sm:items-center bg-gray-100 h-full">
            <div className="rounded-md sm:shadow-md bg-white overflow-hidden lg:flex">
                <section className="hidden sm:flex justify-center bg-green-200 p-8 lg:w-[22rem] lg:justify-start lg:items-end">
                    <div className="font-bold text-2xl">
                        <span className="text-orange-500">Source</span>
                        <span className="text-gray-700">Booster</span>
                    </div>
                </section>
                <section className="p-8">
                    {children}
                </section>
            </div>
        </div>
    );
}