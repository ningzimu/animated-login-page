"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";


interface PupilProps {
 size?: number;
 maxDistance?: number;
 pupilColor?: string;
 forceLookX?: number;
 forceLookY?: number;
}

const Pupil = ({ 
 size = 12, 
 maxDistance = 5,
 pupilColor = "black",
 forceLookX,
 forceLookY
}: PupilProps) => {
 const [mouseX, setMouseX] = useState<number>(0);
 const [mouseY, setMouseY] = useState<number>(0);
 const pupilRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleMouseMove = (e: MouseEvent) => {
 setMouseX(e.clientX);
 setMouseY(e.clientY);
 };

 window.addEventListener("mousemove", handleMouseMove);

 return () => {
 window.removeEventListener("mousemove", handleMouseMove);
 };
 }, []);

 const calculatePupilPosition = () => {
 if (!pupilRef.current) return { x: 0, y: 0 };

 if (forceLookX !== undefined && forceLookY !== undefined) {
 return { x: forceLookX, y: forceLookY };
 }

 const pupil = pupilRef.current.getBoundingClientRect();
 const pupilCenterX = pupil.left + pupil.width / 2;
 const pupilCenterY = pupil.top + pupil.height / 2;

 const deltaX = mouseX - pupilCenterX;
 const deltaY = mouseY - pupilCenterY;
 const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

 const angle = Math.atan2(deltaY, deltaX);
 const x = Math.cos(angle) * distance;
 const y = Math.sin(angle) * distance;

 return { x, y };
 };

 const pupilPosition = calculatePupilPosition();

 return (
 <div
 ref={pupilRef}
 className="rounded-full"
 style={{
 width: `${size}px`,
 height: `${size}px`,
 backgroundColor: pupilColor,
 transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
 transition: 'transform 0.1s ease-out',
 }}
 />
 );
};

interface EyeBallProps {
 size?: number;
 pupilSize?: number;
 maxDistance?: number;
 eyeColor?: string;
 pupilColor?: string;
 isBlinking?: boolean;
 forceLookX?: number;
 forceLookY?: number;
}

const EyeBall = ({ 
 size = 48, 
 pupilSize = 16, 
 maxDistance = 10,
 eyeColor = "white",
 pupilColor = "black",
 isBlinking = false,
 forceLookX,
 forceLookY
}: EyeBallProps) => {
 const [mouseX, setMouseX] = useState<number>(0);
 const [mouseY, setMouseY] = useState<number>(0);
 const eyeRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleMouseMove = (e: MouseEvent) => {
 setMouseX(e.clientX);
 setMouseY(e.clientY);
 };

 window.addEventListener("mousemove", handleMouseMove);

 return () => {
 window.removeEventListener("mousemove", handleMouseMove);
 };
 }, []);

 const calculatePupilPosition = () => {
 if (!eyeRef.current) return { x: 0, y: 0 };

 if (forceLookX !== undefined && forceLookY !== undefined) {
 return { x: forceLookX, y: forceLookY };
 }

 const eye = eyeRef.current.getBoundingClientRect();
 const eyeCenterX = eye.left + eye.width / 2;
 const eyeCenterY = eye.top + eye.height / 2;

 const deltaX = mouseX - eyeCenterX;
 const deltaY = mouseY - eyeCenterY;
 const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

 const angle = Math.atan2(deltaY, deltaX);
 const x = Math.cos(angle) * distance;
 const y = Math.sin(angle) * distance;

 return { x, y };
 };

 const pupilPosition = calculatePupilPosition();

 return (
 <div
 ref={eyeRef}
 className="rounded-full flex items-center justify-center transition-all duration-150"
 style={{
 width: `${size}px`,
 height: isBlinking ? '2px' : `${size}px`,
 backgroundColor: eyeColor,
 overflow: 'hidden',
 }}
 >
 {!isBlinking && (
 <div
 className="rounded-full"
 style={{
 width: `${pupilSize}px`,
 height: `${pupilSize}px`,
 backgroundColor: pupilColor,
 transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
 transition: 'transform 0.1s ease-out',
 }}
 />
 )}
 </div>
 );
};

function LoginPage() {
 const [showPassword, setShowPassword] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [mouseX, setMouseX] = useState<number>(0);
 const [mouseY, setMouseY] = useState<number>(0);
 const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
 const [isBlackBlinking, setIsBlackBlinking] = useState(false);
 const [isTyping, setIsTyping] = useState(false);
 const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
 const [isPurplePeeking, setIsPurplePeeking] = useState(false);
 const purpleRef = useRef<HTMLDivElement>(null);
 const blackRef = useRef<HTMLDivElement>(null);
 const yellowRef = useRef<HTMLDivElement>(null);
 const orangeRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleMouseMove = (e: MouseEvent) => {
 setMouseX(e.clientX);
 setMouseY(e.clientY);
 };

 window.addEventListener("mousemove", handleMouseMove);
 return () => window.removeEventListener("mousemove", handleMouseMove);
 }, []);

 useEffect(() => {
 const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
 const scheduleBlink = () => {
 const blinkTimeout = setTimeout(() => {
 setIsPurpleBlinking(true);
 setTimeout(() => {
 setIsPurpleBlinking(false);
 scheduleBlink();
 }, 150);
 }, getRandomBlinkInterval());
 return blinkTimeout;
 };
 const timeout = scheduleBlink();
 return () => clearTimeout(timeout);
 }, []);

 useEffect(() => {
 const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
 const scheduleBlink = () => {
 const blinkTimeout = setTimeout(() => {
 setIsBlackBlinking(true);
 setTimeout(() => {
 setIsBlackBlinking(false);
 scheduleBlink();
 }, 150);
 }, getRandomBlinkInterval());
 return blinkTimeout;
 };
 const timeout = scheduleBlink();
 return () => clearTimeout(timeout);
 }, []);

 useEffect(() => {
 if (isTyping) {
 setIsLookingAtEachOther(true);
 const timer = setTimeout(() => {
 setIsLookingAtEachOther(false);
 }, 800);
 return () => clearTimeout(timer);
 } else {
 setIsLookingAtEachOther(false);
 }
 }, [isTyping]);

 useEffect(() => {
 if (password.length > 0 && showPassword) {
 const schedulePeek = () => {
 const peekInterval = setTimeout(() => {
 setIsPurplePeeking(true);
 setTimeout(() => {
 setIsPurplePeeking(false);
 }, 800);
 }, Math.random() * 3000 + 2000);
 return peekInterval;
 };
 const firstPeek = schedulePeek();
 return () => clearTimeout(firstPeek);
 } else {
 setIsPurplePeeking(false);
 }
 }, [password, showPassword, isPurplePeeking]);
}

export const Component = LoginPage;
