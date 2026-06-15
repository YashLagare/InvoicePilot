import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar1Icon } from "lucide-react"

const CreateInvoice = () => {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col gap-1 w-fit mb-6">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">Draft</Badge>
                        <Input placeholder="test 123" />
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <Label>Invoice No.</Label>
                        <div className="flex">
                            <span className="px-3 border border-r rounded-l-md bg-muted flex item-center">#</span>
                            <Input className="rounded-l-none" placeholder="1" />
                        </div>
                    </div>

                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue="Rupee">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Rupee">Indian Rupee -- Rupee</SelectItem>
                                <SelectItem value="USD">United States Dollar -- USD</SelectItem>
                                <SelectItem value="EUR">Euro -- EUR</SelectItem>
                                <SelectItem value="GBP">British Pound -- GBP</SelectItem>
                                <SelectItem value="CNY">Canadian Dollar -- CAD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input placeholder="Your name" />
                            <Input placeholder="Your email" />
                            <Input placeholder="Your Address" />
                        </div>
                    </div>

                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input placeholder="Client name" />
                            <Input placeholder="Client email" />
                            <Input placeholder="Client Address" />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-2">
                    <div>
                        <Label>Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <Calendar1Icon />Pick a date
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default CreateInvoice