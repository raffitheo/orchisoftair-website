'use client';

import { useEffect, useState } from 'react';
import { Images } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import GalleryImage from '@/types/gallery-image';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/components/ui/loader';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    if (loading)
      document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento galleria...`;
    else {
      if (galleryImages.length > 0)
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Galleria Orchi`;
      else
        document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessuna immagine trovata`;
    }
  }, [galleryImages, loading]);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setGalleryImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-28">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mt-10 mb-4">
          <Images className="text-orchi-red" size={32} />

          <h1 className="display-text text-5xl md:text-6xl text-orchi-light">
            GALLERIA <span className="text-orchi-red">ORCHI</span>
          </h1>
        </div>

        <p className="text-orchi-light/70 mb-12">
          Ogni foto racconta una storia: una manovra riuscita, un’azione
          fulminea, una strategia condivisa, un sorriso a fine partita.
          <br />
          La nostra galleria è un viaggio visivo nel mondo degli Orchi Trieste:
          tornei, allenamenti, giocate domenicali e momenti fuori dal campo. È
          qui che riviviamo emozioni, crescita e cameratismo.
          <br />
          Sfoglia le immagini e scopri cosa rende il nostro team così speciale,
          un frame alla volta.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.length === 0 ? (
            loading ? (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <Loader className="m-auto" text="Caricamento in corso..." />
              </div>
            ) : (
              <div className="flex flex-col col-span-1 md:col-span-3 h-[17.25rem]">
                <span className="text-lg text-center text-orghi-light mx-auto mt-auto">
                  Non ci sono membri nella squadra!
                </span>

                <span className="text-center text-orchi-light/70 mx-auto mb-auto">
                  Non ci sono immagini al momento, ma non temere: siamo
                  costantemente all'opera per creare nuove ed entusiasmanti
                  attività e contenuti esclusivi per i nostri soci! Tieni
                  d'occhio questa pagina per tutti gli aggiornamenti!
                </span>
              </div>
            )
          ) : (
            galleryImages.map((image) => (
              <div
                className="group relative overflow-hidden decorated-border bg-orchi-gray/20 hover:bg-orchi-gray/30 transition-all duration-300"
                key={image.id}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    height={382}
                    src={image.url}
                    width={382}
                  />
                </div>

                <div className="absolute inset-0 bg-orchi/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="tactical-text text-orchi-gold text-lg mb-1">
                      {image.title}
                    </h3>

                    <p className="text-orchi-light text-sm">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-20 p-8 bg-orchi-gray/20 border border-orchi-gray relative">
          <div className="absolute inset-0 bg-tactical-pattern opacity-5"></div>

          <div className="relative z-10">
            <h2 className="tactical-text text-3xl text-center text-orchi-light mb-4">
              UNISCITI AGLI ORCHI
            </h2>

            <p className="text-center text-orchi-light/70 mb-6 max-w-2xl mx-auto">
              Sei appassionato di softair e cerchi una squadra seria con cui
              crescere e competere? Gli Orchi sono sempre alla ricerca di nuovi
              talenti da integrare nel team.
            </p>

            <div className="text-center">
              <Link
                className="inline-block bg-orchi-red hover:bg-orchi-gold text-white tactical-text py-3 px-8 transition-colors duration-300"
                href="/join-us"
              >
                CANDIDATI ORA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
