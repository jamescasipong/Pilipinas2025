import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PhFlag } from "@/components/ph-flag"

export default function FeedbackPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            <header className="bg-white shadow-md border-b-4 border-ph-red">
                <div className="container mx-auto py-4 px-4 md:px-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <PhFlag className="h-8 w-8" />
                            <Link href="/" className="text-2xl font-bold text-ph-blue">
                                PiliPinas <span className="text-ph-red">2025</span>
                            </Link>
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
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-ph-blue mb-2">
                            Submit <span className="text-ph-red">Feedback</span>
                        </h1>
                        <div className="h-1 w-32 bg-ph-yellow mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-700 max-w-2xl mx-auto">
                            Help us improve PiliPinas 2025 by submitting feedback, reporting issues, or suggesting new features or
                            candidate data.
                        </p>
                    </div>

                    <Card className="border-2 border-ph-yellow shadow-lg overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-ph-blue via-ph-red to-ph-yellow w-full"></div>
                        <CardHeader>
                            <CardTitle className="text-2xl text-ph-blue">Feedback Form</CardTitle>
                            <CardDescription>
                                Your input helps us make PiliPinas 2025 more accurate, useful, and user-friendly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Name (Optional)</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email (Optional)</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                                <p className="text-xs text-gray-500">We'll only use this to follow up on your feedback if necessary.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Feedback Type</Label>
                                <RadioGroup defaultValue="issue">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="issue" id="issue" />
                                            <Label htmlFor="issue">Report an Issue</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="candidate-data" id="candidate-data" />
                                            <Label htmlFor="candidate-data">Candidate Data Update</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="feature" id="feature" />
                                            <Label htmlFor="feature">Feature Suggestion</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="other" id="other" />
                                            <Label htmlFor="other">Other</Label>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="candidate">Related Candidate (if applicable)</Label>
                                <Select>
                                    <SelectTrigger id="candidate">
                                        <SelectValue placeholder="Select a candidate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Not related to a specific candidate</SelectItem>
                                        <SelectItem value="1">Benhur Abalos</SelectItem>
                                        <SelectItem value="5">Bam Aquino</SelectItem>
                                        <SelectItem value="11">Bong Revilla</SelectItem>
                                        <SelectItem value="50">Manny Pacquiao</SelectItem>
                                        <SelectItem value="other">Other (specify in description)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="position-type">Position Type (if suggesting new candidates)</Label>
                                <Select>
                                    <SelectTrigger id="position-type">
                                        <SelectValue placeholder="Select position type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Not suggesting new candidates</SelectItem>
                                        <SelectItem value="senator">Senator</SelectItem>
                                        <SelectItem value="president">President</SelectItem>
                                        <SelectItem value="vice-president">Vice President</SelectItem>
                                        <SelectItem value="governor">Governor</SelectItem>
                                        <SelectItem value="mayor">Mayor</SelectItem>
                                        <SelectItem value="congressman">Congressman</SelectItem>
                                        <SelectItem value="other">Other (specify in description)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Detailed Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please provide details about your feedback, issue, or suggestion..."
                                    rows={6}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="sources">Sources (if providing candidate data)</Label>
                                <Textarea
                                    id="sources"
                                    placeholder="If you're providing candidate information, please list your sources here..."
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500">
                                    For candidate data updates, please provide reliable sources such as news articles, official
                                    statements, or campaign materials.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-4">
                            <Button className="w-full sm:w-auto bg-ph-red hover:bg-red-700">Submit Feedback</Button>
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto border-2 border-ph-yellow text-ph-blue hover:bg-ph-yellow hover:text-ph-blue"
                            >
                                Cancel
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="mt-12 bg-white p-6 rounded-lg border-2 border-ph-yellow shadow-lg">
                        <h2 className="text-xl font-bold text-ph-blue mb-4 flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-ph-red"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                            Other Ways to Contribute
                        </h2>
                        <div className="space-y-4 text-gray-700">
                            <p>In addition to this feedback form, there are other ways you can help improve PiliPinas 2025:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Spread the word:</strong> Share PiliPinas 2025 with friends and family to help more voters
                                    make informed decisions.
                                </li>
                                <li>
                                    <strong>Join our research team:</strong> If you're interested in helping research candidate positions
                                    and verify information, email us at research@pilipinas2025.ph.
                                </li>
                                <li>
                                    <strong>Report misinformation:</strong> If you spot any incorrect information about candidates or
                                    issues, please let us know immediately.
                                </li>
                                <li>
                                    <strong>Suggest new questions:</strong> If you think there are important issues missing from our
                                    questionnaire, we'd love to hear your suggestions.
                                </li>
                            </ul>
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
