'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, PieChart } from "lucide-react"

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

const calculateBudgetRange = (revenue: number, lowPercentage: number, highPercentage: number) => {
  const marketingBudget5 = revenue * 0.05
  const marketingBudget10 = revenue * 0.10

  if (revenue < 25000000) {
    return `$10,000 - $20,000`
  } else if (revenue > 1000000000) {
    const low = 50000000 * lowPercentage
    const high = 100000000 * highPercentage
    return `${formatCurrency(low)} - ${formatCurrency(high)}`
  } else {
    const low = marketingBudget5 * lowPercentage
    const high = marketingBudget10 * highPercentage
    return `${formatCurrency(low)} - ${formatCurrency(high)}`
  }
}

const PriorityModal = ({ priority, description }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-semibold">{priority}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{priority} Priority</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
      </DialogContent>
    </Dialog>
  )
}

const ComplexityModal = ({ complexity, description }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-semibold">{complexity}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{complexity} Complexity</DialogTitle>
        </DialogHeader>
        <p>{description}</p>
      </DialogContent>
    </Dialog>
  )
}

export function RoiCalculator() {
  const [revenue, setRevenue] = useState<number>(100000000)

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setRevenue(Number(value))
  }

  const formattedRevenue = revenue ? `$${revenue.toLocaleString()}` : '$'

  const marketingBudget5 = revenue * 0.05
  const marketingBudget10 = revenue * 0.10

  const priorityDescriptions = {
    Low: "The website contributes minimally to revenue generation and serves a supportive role.",
    Medium: "The website significantly influences revenue generation but is not the primary source.",
    High: "The website is a key driver of revenue and essential for business profitability."
  }

  const complexityDescriptions = {
    Simple: "Involves basic redesigns or new builds, possibly using no-code platforms with minimal features and straightforward design.",
    Average: "Requires moderate redesigns or new builds, possibly using content management systems (CMS) like WordPress or Drupal with custom features and enhanced user experience.",
    Complex: "Entails comprehensive redesigns or new builds, possibly using digital experience platforms (DXP) or custom databases with intricate designs, advanced features, and full system integrations."
  }

  const budgetMatrix = [
    {
      priority: "Low",
      simple: calculateBudgetRange(revenue, 0.0125, 0.01),
      average: calculateBudgetRange(revenue, 0.02, 0.02),
      complex: calculateBudgetRange(revenue, 0.0375, 0.03)
    },
    {
      priority: "Medium",
      simple: calculateBudgetRange(revenue, 0.025, 0.02),
      average: calculateBudgetRange(revenue, 0.0375, 0.03),
      complex: calculateBudgetRange(revenue, 0.05, 0.04)
    },
    {
      priority: "High",
      simple: calculateBudgetRange(revenue, 0.0375, 0.03),
      average: calculateBudgetRange(revenue, 0.05, 0.04),
      complex: calculateBudgetRange(revenue, 0.0625, 0.05)
    }
  ]

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-4xl">
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-3xl font-bold">B2B Website Budgeting Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg opacity-90">Estimate your website budget based on your company's annual revenue and project complexity.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-green-500" />
            Company Annual Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              id="revenue"
              type="text"
              value={formattedRevenue}
              onChange={handleRevenueChange}
              className="text-2xl font-bold"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="bg-gray-100 p-2 rounded-full">
                <PieChart className="w-6 h-6 text-blue-500" />
              </div>
              5% Marketing Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(marketingBudget5)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <div className="bg-gray-100 p-2 rounded-full">
                <PieChart className="w-6 h-6 text-purple-500" />
              </div>
              10% Marketing Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{formatCurrency(marketingBudget10)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Website Budget Ranges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Business Priority</TableHead>
                <TableHead><ComplexityModal complexity="Simple" description={complexityDescriptions.Simple} /></TableHead>
                <TableHead><ComplexityModal complexity="Average" description={complexityDescriptions.Average} /></TableHead>
                <TableHead><ComplexityModal complexity="Complex" description={complexityDescriptions.Complex} /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetMatrix.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <PriorityModal priority={row.priority} description={priorityDescriptions[row.priority]} />
                  </TableCell>
                  <TableCell>{row.simple}</TableCell>
                  <TableCell 
                    className={row.priority === "Medium" ? "bg-green-100" : ""}
                  >
                    {row.average}
                  </TableCell>
                  <TableCell>{row.complex}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}