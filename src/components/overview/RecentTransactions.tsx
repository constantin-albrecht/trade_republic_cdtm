
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowDown, 
  ArrowUp,
  ShoppingCart,
  Wallet,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for recent transactions
const transactions = [
  {
    id: "t1",
    name: "Supermarket",
    amount: "-$86.42",
    date: "Today",
    type: "expense",
    category: "Groceries",
    icon: ShoppingCart
  },
  {
    id: "t2",
    name: "Salary",
    amount: "+$4,320.00",
    date: "Yesterday",
    type: "income",
    category: "Income",
    icon: Wallet
  },
  {
    id: "t3",
    name: "Amazon",
    amount: "-$124.00",
    date: "May 28",
    type: "expense",
    category: "Shopping",
    icon: ShoppingCart
  },
  {
    id: "t4",
    name: "Netflix",
    amount: "-$15.99",
    date: "May 27",
    type: "expense",
    category: "Entertainment",
    icon: CreditCard
  },
  {
    id: "t5",
    name: "Freelance Work",
    amount: "+$750.00",
    date: "May 26",
    type: "income",
    category: "Income",
    icon: Wallet
  }
];

const RecentTransactions: React.FC = () => {
  return (
    <Card className="col-span-1 h-[400px]">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest spending and earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="flex items-center gap-2">
                    <div className={cn(
                      "p-1 rounded-md",
                      transaction.type === "expense" ? "bg-red-100" : "bg-green-100"
                    )}>
                      <transaction.icon className={cn(
                        "h-4 w-4",
                        transaction.type === "expense" ? "text-finance-danger" : "text-finance-accent"
                      )} />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">{transaction.category}</p>
                    </div>
                  </TableCell>
                  <TableCell className={cn(
                    "font-medium",
                    transaction.type === "expense" ? "text-finance-danger" : "text-finance-accent"
                  )}>
                    <div className="flex items-center">
                      {transaction.type === "expense" ? 
                        <ArrowDown className="h-3 w-3 mr-1" /> : 
                        <ArrowUp className="h-3 w-3 mr-1" />}
                      {transaction.amount}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
