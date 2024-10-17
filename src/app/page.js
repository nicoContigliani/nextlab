'use client'
import { useXML } from '../utils/useXML';

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
    </main>
  );
}
// https://www.youtube.com/watch?v=ZZa9o0TrhgE&ab_channel=TechNursery