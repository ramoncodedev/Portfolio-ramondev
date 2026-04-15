"use client";

import React from "react";
import { cn } from "@/src/lib/utils";

export interface BentoItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden transition-all duration-500",
                        "bg-white/[0.02] backdrop-blur-sm",
                        "hover:bg-white/[0.04]",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
                        {
                            "bg-white/[0.04] -translate-y-1":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={`absolute inset-0 ${
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-500`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:8px_8px]" />
                    </div>

                    <div className="relative flex flex-col h-full justify-between space-y-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all duration-500">
                                    {item.icon}
                                </div>
                                {item.status && (
                                    <span
                                        className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md",
                                            "bg-white/5 text-white/40",
                                            "transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/60"
                                        )}
                                    >
                                        {item.status}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-white tracking-tight text-lg flex items-baseline gap-2">
                                    {item.title}
                                    {item.meta && (
                                        <span className="text-[10px] text-white/20 font-mono uppercase tracking-wider">
                                            {item.meta}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-sm text-white/50 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/30 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white/50"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                                {item.cta || "Ver Detalhes →"}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export { BentoGrid }
