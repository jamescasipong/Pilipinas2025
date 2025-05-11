import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PhFlag } from "@/components/ph-flag"


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
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
            </nav>
            <Button className="md:hidden bg-ph-blue hover:bg-blue-800">Menu</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 md:px-6">
        <section className="max-w-4xl mx-auto text-center mb-16 relative">
          {/* Decorative stars */}
          <div className="absolute -top-4 left-1/4 ph-star"></div>
          <div className="absolute top-12 right-1/4 ph-star"></div>
          <div className="absolute -bottom-4 left-1/3 ph-star"></div>

          <h2 className="text-4xl font-bold text-ph-blue mb-2">
            Find Your Perfect <span className="text-ph-red">Candidate Match</span>
          </h2>
          <div className="h-1 w-32 bg-ph-yellow mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 mb-8">
            Answer a few questions about your stance on key issues and we'll match you with candidates who share your
            values.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-ph-red hover:bg-red-700 animate-pulse-scale">
              <Link href="/questionnaire">Take the Questionnaire</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
            >
              <Link href="/chatbot">Chat with our AI Assistant</Link>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="overflow-hidden border-2 border-ph-yellow shadow-lg hover:shadow-xl transition-all">
            <div className="h-2 bg-ph-red w-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-ph-blue">Answer Questions</CardTitle>
              <CardDescription>Share your stance on important social and political issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-blue-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ph-blue animate-float"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-ph-yellow shadow-lg hover:shadow-xl transition-all">
            <div className="h-2 bg-ph-blue w-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-ph-red">Get Matched</CardTitle>
              <CardDescription>Our algorithm finds candidates who align with your values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-blue-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ph-red animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-ph-yellow shadow-lg hover:shadow-xl transition-all">
            <div className="h-2 bg-ph-yellow w-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-ph-blue">Chat with AI</CardTitle>
              <CardDescription>Get personalized guidance from our AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-blue-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-ph-yellow animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                  <circle cx="8" cy="8" r="1"></circle>
                  <circle cx="16" cy="8" r="1"></circle>
                  <path d="M8 16l4-4 4 4"></path>
                </svg>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border-2 border-ph-yellow">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-ph-red flex items-center justify-center text-white font-bold">
              ?
            </div>
            <h2 className="text-2xl font-bold text-ph-blue">How It Works</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ph-blue text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-ph-red">Answer questions about your stance on key issues</h3>
                <p className="text-gray-700">
                  Share your views on topics like sexual orientation, divorce, healthcare, and more.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ph-red text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-ph-blue">Our algorithm analyzes your preferences</h3>
                <p className="text-gray-700">
                  We compare your answers with the stated positions of candidates in the election.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-ph-yellow text-ph-blue rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-ph-red">Get matched with compatible candidates</h3>
                <p className="text-gray-700">
                  We'll show you the top 12 candidates who most closely align with your values.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-ph-blue to-ph-red text-white py-12 px-4 md:px-6">
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
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-ph-yellow">Disclaimer</h3>
              <p className="text-white/80">
                This tool is designed to assist in your voting decision, but it should not be the sole factor in your choice. Always conduct thorough research on candidates before making your decision. I scrape this data from Rappler, and if you have feedback or additional data to contribute, please send it.
              </p>
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
