import { useFetchMessagesQuery, useSendMessageMutation } from "@/api/chatApi";
import { selectCurrentUser } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import {
  Loader2,
  Send,
  Video,
  MessageSquare,
  Paperclip,
  Smile,
  ArrowLeft, 
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState, Fragment } from "react";
import { useSocket } from "@/context/SocketContext";
import { cn } from "@/lib/utils";
import VideoCall from "./VideoCall";
import { toast } from "sonner";
import { format, isSameDay } from "date-fns";

const DateSeparator = ({ date }) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t"></div>
    <span className="flex-shrink mx-4 text-xs text-muted-foreground">
      {format(new Date(date), "MMMM d, yyyy")}
    </span>
    <div className="flex-grow border-t"></div>
  </div>
);

const ChatMessage = ({ msg, currentUser }) => {
  const isMyMessage = msg.sender?._id === currentUser?._id;
  return (
    <div
      className={cn(
        "flex items-end gap-2 my-2 w-full",
        isMyMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "px-4 py-2 max-w-[75%] shadow-sm rounded-2xl",
          isMyMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted rounded-bl-none"
        )}
      >
        <p className="text-base whitespace-pre-wrap">{msg.content}</p>
      </div>
    </div>
  );
};

const ChatBox = ({ selectedChat, onBack }) => {
  const currentUser = useSelector(selectCurrentUser);
  const {
    data: initialMessages,
    isLoading: isLoadingMessages,
    isError,
  } = useFetchMessagesQuery(selectedChat?._id, { skip: !selectedChat });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
  const socket = useSocket();
  const scrollAreaRef = useRef(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => setMessages(initialMessages || []), [initialMessages]);

  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("joinChat", selectedChat._id);
      const messageHandler = (newMessage) => {
        if (selectedChat?._id === newMessage.chat._id) {
          setMessages((prev) => [...prev, newMessage]);
        } else if (newMessage.sender) {
          toast.info(`New message from ${newMessage.sender.fullName}`);
        }
      };
      socket.on("messageReceived", messageHandler);
      return () => socket.off("messageReceived", messageHandler);
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector("div > div");
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setOtherUser(
      selectedChat
        ? selectedChat.users.find((u) => u._id !== currentUser._id)
        : null
    );
  }, [selectedChat, currentUser]);

  const handleSend = async () => {
    if (!input.trim() || !selectedChat) return;
    const tempId = Date.now().toString();
    const newMessage = {
      _id: tempId,
      content: input,
      sender: currentUser,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      await sendMessage({ content: input, chatId: selectedChat._id }).unwrap();
    } catch (error) {
      toast.error("Failed to send message.");
      setMessages((prev) => prev.filter((m) => m._id !== tempId));
    }
  };

  if (!selectedChat) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-background text-center p-8">
        <MessageSquare className="h-24 w-24 text-muted-foreground/30 mb-4" />
        <h3 className="text-2xl font-semibold">Select a Conversation</h3>
        <p className="text-muted-foreground max-w-sm">
          Choose from your existing conversations on the left to start
          messaging.
        </p>
      </div>
    );
  }

  let lastDisplayedDate = null;

  return (
    <div className="flex flex-col h-full bg-background">
      {showVideoCall && (
        <VideoCall
          otherUser={otherUser}
          onCallEnded={() => setShowVideoCall(false)}
          startCall={true}
        />
      )}

      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden" 
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <img
            src={otherUser?.profile?.avatar || "/placeholder.gif"}
            className="h-10 w-10 rounded-full object-cover"
            alt={otherUser?.fullName}
          />
          <div>
            <p className="font-bold">{otherUser?.fullName}</p>
            <p className="text-xs text-green-500 font-semibold">Active now</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setShowVideoCall(true)}>
          <Video className="h-5 w-5 text-primary" />
        </Button>
      </div>

      <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
        {isLoadingMessages ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-1/3 rounded-lg" />
            <Skeleton className="h-16 w-1/2 rounded-lg ml-auto" />
            <Skeleton className="h-12 w-1/4 rounded-lg" />
          </div>
        ) : isError ? (
          <div className="text-center text-destructive p-8">
            Failed to load messages.
          </div>
        ) : (
          messages.map((msg, index) => {
            const messageDate = msg.createdAt;
            let showDateSeparator = false;
            if (
              !lastDisplayedDate ||
              !isSameDay(new Date(messageDate), new Date(lastDisplayedDate))
            ) {
              showDateSeparator = true;
              lastDisplayedDate = messageDate;
            }
            return (
              <Fragment key={msg._id || index}>
                {showDateSeparator && <DateSeparator date={messageDate} />}
                <ChatMessage msg={msg} currentUser={currentUser} />
              </Fragment>
            );
          })
        )}
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full items-center gap-2"
        >
          <Button type="button" variant="ghost" size="icon">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <Smile className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 border-none mb-2"
              side="top"
              align="start"
            >
              <EmojiPicker
                onEmojiClick={(emojiObject) =>
                  setInput((prev) => prev + emojiObject.emoji)
                }
              />
            </PopoverContent>
          </Popover>
          <Input
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            autoComplete="off"
            className="h-12 flex-grow bg-muted/60 rounded-full px-5"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSending || !input.trim()}
            className="h-12 w-12 flex-shrink-0 rounded-full bg-primary hover:bg-primary/90"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;


// //import { useScheduleInterviewMutation } from "@/api/interviewApi";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { format } from "date-fns";
// import { CalendarIcon, Loader2 } from "lucide-react";
// import { cn } from "@/lib/utils";

// const interviewSchema = z.object({
//   interviewType: z.enum(['online', 'inoffice'], { required_error: "Please select an interview type." }),
//   date: z.date({ required_error: "A date for the interview is required." }),
//   time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please use a valid HH:MM format."),
//   locationOrLink: z.string().min(5, "This field requires at least 5 characters."),
// });

// const ScheduleInterviewForm = ({ applicationId, closeDialog }) => {
//     const [scheduleInterview, { isLoading }] = useScheduleInterviewMutation();
//     const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
//         resolver: zodResolver(interviewSchema),
//         defaultValues: { interviewType: 'online' }
//     });
//     const interviewType = watch("interviewType");

//     const onSubmit = async (data) => {
//         const promise = scheduleInterview({ ...data, applicationId }).unwrap();
//         toast.promise(promise, {
//             loading: "Scheduling interview...",
//             success: (res) => {
//                 closeDialog();
//                 return res.message || "Interview scheduled successfully!";
//             },
//             error: (err) => err?.data?.message || "Failed to schedule interview.",
//         });
//     };
    
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 pt-4">
//             <div className="grid gap-3">
//                 <Label>Interview Type</Label>
//                 <Controller
//                     name="interviewType"
//                     control={control}
//                     render={({ field }) => (
//                         <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
//                             <Label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer has-[input:checked]:border-primary flex-1 justify-center">
//                                 <RadioGroupItem value="online" /> Online
//                             </Label>
//                             <Label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer has-[input:checked]:border-primary flex-1 justify-center">
//                                 <RadioGroupItem value="inoffice" /> In-Office
//                             </Label>
//                         </RadioGroup>
//                     )}
//                 />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                     <Label htmlFor="date">Date</Label>
//                     <Controller
//                         name="date"
//                         control={control}
//                         render={({ field }) => (
//                              <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground", errors.date && "border-destructive")}>
//                                         <CalendarIcon className="mr-2 h-4 w-4" />
//                                         {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0">
//                                     <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} initialFocus />
//                                 </PopoverContent>
//                             </Popover>
//                         )}
//                     />
//                     {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
//                 </div>
//                  <div className="grid gap-2">
//                     <Label htmlFor="time">Time (24-hour)</Label>
//                     <Input id="time" type="time" {...register('time')} className={cn(errors.time && "border-destructive")} />
//                     {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
//                 </div>
//             </div>
//             <div className="grid gap-2">
//                 <Label htmlFor="locationOrLink">{interviewType === 'inoffice' ? 'Full Office Address' : 'Video Meeting Link'}</Label>
//                 <Input id="locationOrLink" placeholder={interviewType === 'inoffice' ? 'e.g., 123 Main St, Anytown' : 'e.g., https://meet.google.com/xyz'} {...register('locationOrLink')} className={cn(errors.locationOrLink && "border-destructive")} />
//                 {errors.locationOrLink && <p className="text-sm text-destructive">{errors.locationOrLink.message}</p>}
//             </div>
//             <Button type="submit" disabled={isLoading} className="mt-2 w-full">
//                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
//                 Confirm & Schedule Interview
//             </Button>
//         </form>
//     );
// };

// export default ScheduleInterviewForm;