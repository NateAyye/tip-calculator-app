"use client";

import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import {
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Edit,
  Trash,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Tip {
  id: string;
  date: Date;
  amount: number;
}

export default function TipTrackerCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tips, setTips] = useState<Tip[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [newTipAmount, setNewTipAmount] = useState("");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = addDays(monthStart, -getDay(monthStart));
  const endDate = addDays(monthEnd, 6 - getDay(monthEnd));

  const dateRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const addOrUpdateTip = () => {
    const amount = parseFloat(newTipAmount);
    if (isNaN(amount) || amount < 0) return;

    if (editingTip) {
      setTips(
        tips.map((tip) =>
          tip.id === editingTip.id ? { ...tip, amount } : tip,
        ),
      );
    } else {
      const newTip: Tip = {
        id: Date.now().toString(),
        date: selectedDate,
        amount,
      };
      setTips([...tips, newTip]);
    }
    setNewTipAmount("");
    setEditingTip(null);
    setIsDialogOpen(false);
  };

  const deleteTip = (tipId: string) => {
    setTips(tips.filter((tip) => tip.id !== tipId));
  };

  const openEditDialog = (tip: Tip) => {
    setEditingTip(tip);
    setNewTipAmount(tip.amount.toString());
    setIsDialogOpen(true);
  };

  const getTipForDate = (date: Date) => {
    return tips.find((tip) => isSameDay(tip.date, date));
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
          <div className="flex items-center gap-3">
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => {
                setSelectedDate(new Date());
                setCurrentMonth(new Date());
              }}
            >
              <CalendarCheck className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {dateRange.map((date, i) => {
            const tip = getTipForDate(date);
            return (
              <Button
                key={i}
                variant={isSameDay(date, selectedDate) ? "default" : "outline"}
                className={`flex h-20 flex-col items-center justify-between p-1 ${
                  !isSameMonth(date, currentMonth) ? "opacity-50" : ""
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <span className="text-xs">{format(date, "d")}</span>
                {tip && (
                  <span className="text-xs font-semibold">
                    ${tip.amount.toFixed(2)}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="mb-2 font-semibold">
          Tips for {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        {getTipForDate(selectedDate) ? (
          <div className="flex w-full items-center justify-between">
            <span>${getTipForDate(selectedDate)?.amount.toFixed(2)}</span>
            <div>
              <Button
                variant="outline"
                size="icon"
                className="mr-2"
                onClick={() => openEditDialog(getTipForDate(selectedDate)!)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => deleteTip(getTipForDate(selectedDate)!.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">
            No tip recorded for this date.
          </p>
        )}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4">
              {getTipForDate(selectedDate) ? "Edit Tip" : "Add Tip"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTip ? "Edit Tip" : "Add New Tip"}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-end gap-2">
              <div className="flex-grow">
                <Label htmlFor="tip-amount">Tip Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    id="tip-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newTipAmount}
                    onChange={(e) => setNewTipAmount(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Button onClick={addOrUpdateTip}>
                {editingTip ? "Update" : "Add"}
                hi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
