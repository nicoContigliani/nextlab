'use client'
import { useXML } from '../utils/useXML';
import FileUpload from '@/components/FileUpload'

import { useState, useEffect } from 'react';
export default function Home() {
  const { data, isLoading, isError } = useXML('/xmls/propiedades_20240415.xml');
  useEffect(() => {
    const funtionAsync = async () => {
      await console.log(data)
    }
    funtionAsync()
  }, [data])



  return (
    <main>
      hola
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">File Upload</h1>
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}
// https://www.youtube.com/watch?v=ZZa9o0TrhgE&ab_channel=TechNursery