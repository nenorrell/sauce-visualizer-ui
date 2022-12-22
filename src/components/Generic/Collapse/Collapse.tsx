import React, { PropsWithChildren, ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const toggleExpand = (ref :RefObject<HTMLDivElement>, isExpanded :boolean, rootCollapse ?:boolean)=>{
    if(ref.current?.clientHeight && !isExpanded) {
        ref.current.style.height = "0";
    }
    else if(ref.current && isExpanded) {
        if(!rootCollapse) {
            ref.current.style.height = "0";
            ref.current.style.height = `${ref.current.scrollHeight}px`;
        }
    }
};

interface ICollapse {
    defaultExpand ?:boolean
    headerContent :string | ReactNode
    headerClasses ?:string[]
    leftIcon ?:IconDefinition
    rootCollapse ?:boolean
}
export const Collapse = (props :PropsWithChildren<ICollapse>) => {
    const expandableContent = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(props.defaultExpand || false);

    useEffect(()=>{
        toggleExpand(expandableContent, isExpanded, props.rootCollapse);
    }, [isExpanded]);

    return (
        <div className="w-100">
            <div className={`collapse-title cursor-pointer flex items-center justify-center
                ${props.headerClasses?.join(" ") || ""}`
            }
            onClick={()=> setIsExpanded(!isExpanded) }>
                {
                    props.leftIcon ? <FontAwesomeIcon icon={props.leftIcon} className="mr-2" /> : null
                }
                <div className="w-full">{props.headerContent}</div>
                <p className={`items-end transition ease-in-out ${isExpanded ? "" : "-rotate-90"}`}>
                    <FontAwesomeIcon icon={faChevronDown}/>
                </p>
            </div>

            <div
                ref={expandableContent}
                className={`collapse-body ease-linear duration-[.25s] transition-[height] overflow-hidden ${isExpanded ? "" : "h-0"}`}
            >
                {props.children}
            </div>
        </div>
    );
};
