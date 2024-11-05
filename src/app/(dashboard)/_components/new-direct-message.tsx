import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { PlusIcon } from "lucide-react";


export function NewDirectMessage(){
    return (
        <Dialog>
            <DialogTrigger asChild><SidebarGroupAction>
                <PlusIcon />
                <span className="sr-only">New Direct Message</span>
              </SidebarGroupAction></DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>New Direct Message</DialogTitle>
                    <DialogDescription>
                        Enter a username to start a new message
                    </DialogDescription>
                </DialogHeader>
                <form className="contents">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" type="text" />
                    </div>
                    <DialogFooter>
                        <Button className="bg-black text-white">Start Direct Message</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}