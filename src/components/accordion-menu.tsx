'use client'

import { useState } from "react";
import Link from "next/link";

export function AccordionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        메뉴
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              소개
            </Link>
            <a
              href="https://forms.gle/scFWRXenuPyKZBav9"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              문의하기
            </a>
            <Link href="/free-score" className="block px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50">
              무료 추천 지수란?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 