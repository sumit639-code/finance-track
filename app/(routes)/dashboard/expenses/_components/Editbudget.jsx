"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/Utils/dbconfig";
import { Budgets } from "@/Utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
const Editbudget = ({ budgetInfo,refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);
  const { user } = useUser();

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id));

    if (result) {
        refreshData()
      toast("Budget Updated");
    }
  };

  useEffect(()=>{
    if(budgetInfo){
        setEmojiIcon(budgetInfo?.icon)
    }
  },[budgetInfo])
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setOpenEmoji(!openEmoji);
                }}
              >
                {emojiIcon}
              </Button>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmoji}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmoji(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1"> Budget Name</h2>
                <Input
                  placeholder="e.g.home decor"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={budgetInfo?.name}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1"> Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="$150"
                  defaultValue={budgetInfo?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={() => onUpdateBudget()}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editbudget;
