'use client'

import { useEffect, useRef, useState } from "react";

export function useClickOutside() {
    const [expanded, setExpanded] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { divRef, expanded, setExpanded };
}
