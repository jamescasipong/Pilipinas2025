"use client"
import Link from "next/link"
import { PhFlag } from "@/components/ph-flag"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import Header from "@/components/header";
import {useState} from "react"; // You can install react-icons if you haven't

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen}></Header>


      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ph-blue mb-2">
              About <span className="text-ph-red">PiliPinas 2025</span>
            </h1>
            <div className="h-1 w-32 bg-ph-yellow mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Learn more about our mission to help Filipino voters make informed decisions in the 2025 elections.
            </p>
          </div>

          <div className="bg-white rounded-lg border-2 border-ph-yellow shadow-lg overflow-hidden mb-12">
            <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ph-blue mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                PiliPinas 2025 was created with a simple but powerful mission: to help Filipino voters make informed
                decisions by connecting them with candidates who share their values and priorities.
              </p>
              <p className="text-gray-700 mb-6">
                In a democracy, the power of an informed electorate cannot be overstated. Yet, many voters struggle to
                find reliable, unbiased information about candidates and their positions on key issues. PiliPinas 2025
                aims to bridge this gap by providing a user-friendly platform that:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Helps voters identify their stance on important social and political issues
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ph-blue flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Matches voters with candidates who align with their values</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ph-yellow flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-ph-blue"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Provides comprehensive, unbiased information about candidates and their positions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <span className="text-gray-700">
                    Offers an AI-powered assistant to answer questions about the election process
                  </span>
                </li>
              </ul>
              <p className="text-gray-700">
                We believe that by empowering voters with better information and tools, we can contribute to a healthier
                democracy and a brighter future for the Philippines.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-ph-yellow shadow-lg overflow-hidden">
              <div className="h-2 bg-ph-blue w-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-ph-blue">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-blue text-white font-bold flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-blue">Take the Questionnaire</h3>
                      <p className="text-sm text-gray-600">
                        Answer questions about your stance on key issues facing the Philippines today.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-blue text-white font-bold flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-blue">Get Matched</h3>
                      <p className="text-sm text-gray-600">
                        Our algorithm analyzes your answers and matches you with candidates who share similar views.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-blue text-white font-bold flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-blue">Explore Candidates</h3>
                      <p className="text-sm text-gray-600">
                        Learn more about your matched candidates, their backgrounds, and detailed positions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-blue text-white font-bold flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-blue">Make an Informed Decision</h3>
                      <p className="text-sm text-gray-600">
                        Use this information as one of many tools to help you decide who to vote for in the 2025
                        elections.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="border-2 border-ph-yellow shadow-lg overflow-hidden">
              <div className="h-2 bg-ph-red w-full"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-ph-red">Our Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-red">Non-Partisan</h3>
                      <p className="text-sm text-gray-600">
                        We do not endorse any candidate or party. Our goal is to provide unbiased information.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-red">Transparency</h3>
                      <p className="text-sm text-gray-600">
                        We are transparent about our methodology and the sources of our information.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-red">Accessibility</h3>
                      <p className="text-sm text-gray-600">
                        We strive to make political information accessible to all Filipinos, regardless of background.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-ph-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-ph-red">Privacy</h3>
                      <p className="text-sm text-gray-600">
                        We respect your privacy and do not store or share your personal data or questionnaire responses.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 border-ph-blue shadow-lg overflow-hidden mb-12">
            <div className="h-2 bg-ph-yellow w-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-ph-blue">Meet the Creator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/profile.jpg" alt="@shadcn" />
                  <AvatarFallback>JC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-ph-blue font-semibold">James Casipong</p>
                  <p className="text-gray-600 text-sm">Software Engineer & Founder of PiliPinas 2025</p>
                  {/* <p className="text-gray-600 mt-2 text-sm">
            Passionate about civic engagement, technology, and empowering voters through accessible, reliable information.
        </p> */}
                  <div className="flex gap-4 mt-4">
                    <Link href="https://www.linkedin.com/in/jamescasipong" target="_blank">
                      <FaLinkedin className="text-blue-600 hover:text-blue-700 text-2xl cursor-pointer" />
                    </Link>
                    <Link href="https://github.com/jamescasipong" target="_blank">
                      <FaGithub className="text-gray-800 hover:text-gray-900 text-2xl cursor-pointer" />
                    </Link>
                    <Link href="https://www.facebook.com/casipongjames15" target="_blank">
                      <FaFacebook className="text-blue-800 hover:text-blue-900 text-2xl cursor-pointer" />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>



          <div className="text-center">
            <h2 className="text-2xl font-bold text-ph-blue mb-6">Ready to Find Your Candidate Match?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-ph-red hover:bg-red-700">
                <Link href="/questionnaire">Take the Questionnaire</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
              >
                <Link href="/candidates">Browse Candidates</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-ph-blue to-ph-red text-white py-12 px-4 md:px-6 mt-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <PhFlag className="h-6 w-6" />
                <h3 className="text-xl font-bold">PiliPinas 2025</h3>
              </div>
              <p className="text-white/80">
                Helping voters make informed decisions by matching them with candidates who share their values.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-ph-yellow">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white/80 hover:text-ph-yellow">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/questionnaire" className="text-white/80 hover:text-ph-yellow">
                    Questionnaire
                  </Link>
                </li>
                <li>
                  <Link href="/candidates" className="text-white/80 hover:text-ph-yellow">
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link href="/chatbot" className="text-white/80 hover:text-ph-yellow">
                    AI Assistant
                  </Link>
                </li>
                <li>
                  <Link href="/ballot" className="text-white/80 hover:text-ph-yellow">
                    Ballot
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-ph-yellow">Contact Us</h3>
              <p className="text-white/80 mb-2">Have questions or feedback? We'd love to hear from you.</p>
              <p className="text-white/80">Email: info@pilipinas2025.ph</p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} PiliPinas 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
