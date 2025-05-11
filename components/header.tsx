"use client"
import {PhFlag} from "@/components/ph-flag";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Menu, X} from "lucide-react";

export default function Header({mobileMenuOpen, setMobileMenuOpen}: any) {
    return (
        <header className="bg-white shadow-md border-b-4 border-ph-red">
            <div className="container mx-auto py-4 px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <PhFlag className="h-8 w-8" />
                        <h1 className="text-2xl font-bold text-ph-blue">
                            PiliPinas <span className="text-ph-red">2025</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="text-ph-blue hover:text-ph-red font-medium">
                            Home
                        </Link>
                        <Link href="/about" className="text-ph-blue hover:text-ph-red font-medium">
                            About
                        </Link>
                        <Link href="/candidates" className="text-ph-blue hover:text-ph-red font-medium">
                            Candidates
                        </Link>
                        <Link href="/chatbot" className="text-ph-blue hover:text-ph-red font-medium">
                            AI Assistant
                        </Link>
                        <Link href="/ballot" className="hover:text-yellow-200 text-ph-red font-medium">
                            My Ballot
                        </Link>
                    </nav>
                    <Button
                        className="md:hidden  flex items-center gap-1"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <>
                                <Menu className="h-5 w-5" />
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
                        <Link
                            href="/"
                            className="text-ph-blue hover:text-ph-red font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-ph-blue hover:text-ph-red font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            href="/candidates"
                            className="text-ph-blue hover:text-ph-red font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Candidates
                        </Link>
                        <Link
                            href="/chatbot"
                            className="text-ph-blue hover:text-ph-red font-medium py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            AI Assistant
                        </Link>
                        <Link href="/ballot" className="hover:text-yellow-200 text-ph-red font-medium" onClick={() => setMobileMenuOpen(false)}>
                            My Ballot
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}