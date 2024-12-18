import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";



export function AcceptedFriendsList() {
  const friends = useQuery(api.functions.friend.listAccepted);
  const updateStatus = useMutation(api.functions.friend.updateStatus);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">Accepted Friends</h2>
      {friends?.length === 0 && (
        <FriendsListEmpty>No friends yet</FriendsListEmpty>
      )}
      {friends?.map((friend) => (
        <FriendItem key={friend._id} username={friend.user.username} image={friend.user.image}>
          <Tooltip>
            <TooltipTrigger asChild>
              
              <IconButton
            title="DM"
            className="rounded-full bg-blue-100"
            icon={<MessageCircleIcon />} 
            onClick={() => {}}/>
            </TooltipTrigger>
            <TooltipContent>DM</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              
              <IconButton
            title="Remove Friend"
            className="rounded-full bg-red-100"
            icon={<XIcon />} 
            onClick={() => updateStatus({ id: friend._id, status: "rejected"})}/>
            </TooltipTrigger>
            <TooltipContent>Remove Friend</TooltipContent>
          </Tooltip>
        </FriendItem>
      ))}
    </div>
  );
}

export function PendingFriendsList() {
  const friends = useQuery(api.functions.friend.listPending);
  const updateStatus = useMutation(api.functions.friend.updateStatus);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">Pending Friends</h2>
      {friends?.length === 0 && (
        <FriendsListEmpty>No requests</FriendsListEmpty>
      )}
      {friends?.map((friend) => (
        <FriendItem key={friend._id} username={friend.user.username} image={friend.user.image}>
          
          <IconButton 
          title="Accept" 
          className="rounded-full bg-green-100" 
          icon={<CheckIcon />} 
          onClick={() => updateStatus({id: friend._id, status:"accepted"}) }
          />
          
          <IconButton
            title="Reject"
            className="rounded-full bg-red-100"
            icon={<XIcon />} 
            onClick={() => updateStatus({id: friend._id, status:"rejected"}) } />
        </FriendItem>
      ))}
    </div>
  );
}

function IconButton({
  title,
  className,
  icon,
  onClick,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          className={cn("rounded-full", className)} 
          variant="outline" 
          size="icon"
          onClick={onClick}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}

function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 gap-2.5">
      <div className="flex items-center gap-2 5">
        <Avatar className="size-9 border">
          <AvatarImage src={image} />
          <AvatarFallback />
        </Avatar>
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}

function FriendsListEmpty({children}: {children: React.ReactNode}) {
  return (
    <div className="p-4 bg-muted/50 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}