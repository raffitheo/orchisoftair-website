'use client';

import { useEffect, useState } from 'react';

import { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, BicepsFlexed, Calendar, Dumbbell, Images, ImageUp, Luggage, Search, Users } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import z from 'zod';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Loader from '@/components/ui/loader';
import { supabase } from '@/lib/supabase';
import { GalleryImageSchema, default as GalleryImageType } from '@/types/gallery-image';

const GalleryImageCategorySchema = z.enum(['any', 'event', 'equipment', 'team', 'training']);

type GalleryImageCategory = z.infer<typeof GalleryImageCategorySchema>;

const GalleryPage = () => {
  const [fullscreenImage, setFullscreenImage] = useState<GalleryImageType | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImageType[]>([]);
  const [galleryImagesCount, setGalleryImagesCount] = useState(0);
  const [galleryKey, setGalleryKey] = useState(dayjs().valueOf());
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<GalleryImageCategory>('any');

  useEffect(() => {
    countGalleryImages();
    fetchGalleryImages();
  }, []);

  useEffect(() => {
    if (loading) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Caricamento galleria...`;
    else {
      if (galleryImages.length > 0) document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Galleria Orchi`;
      else document.title = `${process.env.NEXT_PUBLIC_BASSE_TITLE} | Nessuna immagine trovata`;
    }
  }, [galleryImages, loading]);

  useEffect(() => {
    setLoading(true);
    setGalleryImages([]);

    fetchGalleryImages();
  }, [selectedCategory]);

  const countGalleryImages = async () => {
    try {
      const { count: galleryImagesCount, error } = await supabase
        .from('gallery_images')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      setGalleryImagesCount(galleryImagesCount || 0);
    } catch (error) {
      console.error('Error counting gallery images:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il conteggio delle immagini della galleria. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );

      setGalleryImagesCount(-1);
    }
  };

  const fetchGalleryImages = async () => {
    try {
      let query = supabase.from('gallery_images').select('*').order('created_at', { ascending: true });

      if (selectedCategory !== 'any') {
        query = query.eq('category', selectedCategory);
      }

      const { data: galleryImagesData, error: galleryImagesError } = await query;

      if (galleryImagesError) throw galleryImagesError;

      setGalleryImages(galleryImagesData || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error(
        `Si è verificato un errore imprevisto durante il caricamento delle immagini della galleria. Codice errore: ${(error as PostgrestError).code}`,
        {
          description: (error as PostgrestError).hint,
        }
      );
    } finally {
      setLoading(false);
      setGalleryKey(dayjs().valueOf());
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const categories = [
    {
      icon: Images,
      id: 'any',
      name: 'TUTTO',
    },
    {
      icon: Calendar,
      id: 'event',
      name: 'EVENTI',
    },
    {
      icon: Dumbbell,
      id: 'training',
      name: 'ALLENAMENTI',
    },
    {
      icon: Users,
      id: 'team',
      name: 'SQUADRA',
    },
    {
      icon: Luggage,
      id: 'equipment',
      name: 'EQUIPAGGIAMENTO',
    },
  ];

  return (
    <div className="min-h-screen bg-orchi text-orchi-light relative overflow-hidden">
      <Navbar />

      <main className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            animate="animate"
            className="mb-12"
            initial="initial"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <h1 className="display-text text-6xl md:text-8xl text-transparent bg-gradient-to-r from-orchi-gold via-orchi-red to-orchi-gold bg-clip-text mb-8">
              GALLERIA ORCHI
            </h1>

            <p className="text-orchi-light/90 text-xl leading-relaxed">
              Ogni foto racconta una storia: una manovra riuscita, un’azione fulminea, una strategia condivisa, un
              sorriso a fine partita.
              <br />
              La nostra galleria è un viaggio visivo nel mondo degli Orchi Trieste: tornei, allenamenti, giocate
              domenicali e momenti fuori dal campo. È qui che riviviamo emozioni, crescita e cameratismo.
              <br />
              Sfoglia le immagini e scopri cosa rende il nostro team così speciale, un frame alla volta.
            </p>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
            initial="initial"
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Images className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">{galleryImagesCount}</div>

                <div className="text-orchi-light/80 tactical-text">IMMAGINI TOTALI</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <ImageUp className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">1</div>

                <div className="text-orchi-light/80 tactical-text">CARICAMENTO SETTIMANALE (MEDIA)</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <Archive className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">
                  {dayjs().diff(dayjs('01-01-2019'), 'year')}
                </div>

                <div className="text-orchi-light/80 tactical-text">ANNI DI ARCHIVIO</div>
              </CardContent>
            </Card>

            <Card className="glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 text-center">
              <CardContent className="p-6">
                <BicepsFlexed className="h-8 w-8 text-orchi-red mx-auto mb-3" />

                <div className="text-3xl font-bold text-orchi-gold mb-2">∞</div>

                <div className="text-orchi-light/80 tactical-text">RICORDI EPICI</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            animate="animate"
            className="mb-12"
            initial="initial"
            transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => {
                const IconComponent = category.icon;

                return (
                  <Button
                    className={selectedCategory === category.id ? 'bg-orchi-gold disabled:opacity-100' : ''}
                    disabled={selectedCategory === category.id}
                    key={category.id}
                    onClick={() => setSelectedCategory(GalleryImageCategorySchema.parse(category.id))}
                    tabIndex={selectedCategory === category.id ? -1 : undefined}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="initial"
            key={galleryKey}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeInOut' }}
            variants={fadeInUp}
          >
            {galleryImages.length === 0 ? (
              loading ? (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <Loader className="m-auto" text="Caricamento in corso..." />
                </div>
              ) : (
                <div className="flex flex-col col-span-1 md:col-span-3">
                  <span className="tactical-text text-2xl text-orchi-light mb-2">Non ci immagini da visualizzare!</span>

                  <span className="text-orchi-light/75">
                    Non ci sono immagini in questa categoria al momento, ma non temere: siamo costantemente all'opera
                    per creare nuove ed entusiasmanti attività e contenuti esclusivi per i nostri soci! Tieni d'occhio
                    questa pagina per tutti gli aggiornamenti!
                  </span>
                </div>
              )
            ) : (
              galleryImages.map((image) => (
                <Card
                  className="group glass-effect border-orchi-gray/40 hover:border-orchi-gold/50 transition-all duration-300 overflow-hidden"
                  key={image.id}
                >
                  <div
                    className="relative aspect-square overflow-hidden cursor-pointer"
                    onClick={() => setFullscreenImage(image)}
                  >
                    <div className="w-full h-full">
                      <Image
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        height={512}
                        src={image.url}
                        width={512}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-orchi/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orchi-red to-orchi-gold text-white px-3 py-1 rounded-full text-xs tactical-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {categories.find((cat) => cat.id === image.category)?.name || 'GENERALE'}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                        <Search className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="tactical-text text-xl text-orchi-light mb-3 group-hover:text-orchi-gold transition-colors">
                      {image.title}
                    </h3>

                    <p className="text-orchi-light/75 text-sm leading-relaxed">
                      {image.description || 'Nessuna descrizione disponibile.'}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {fullscreenImage && (
          <Dialog
            onOpenChange={(open) => {
              if (!open) setFullscreenImage(null);
            }}
            open={!!fullscreenImage}
          >
            <DialogContent className="max-w-[95vw] max-h-[95vh] h-full p-0 bg-black/95 border-orchi-gray/40 focus:outline-none [&>button]:absolute [&>button]:top-4 [&>button]:right-4 [&>button]:z-50 [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full [&>button]:p-2 [&>button]:transition-colors [&>button]:opacity-100 [&>button]:cursor-pointer [&>button_svg]:h-6 [&>button_svg]:w-6 [&>button_svg]:text-white">
              <DialogTitle className="hidden"></DialogTitle>

              <motion.div
                animate={{ opacity: 1 }}
                className="relative w-full h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <div className="absolute inset-4 top-14 bottom-24">
                  <div className="w-full h-full overflow-hidden rounded-lg">
                    <Image
                      alt={fullscreenImage.title}
                      className="object-contain"
                      fill
                      src={fullscreenImage.url}
                      quality={100}
                    />
                  </div>
                </div>

                <div className="absolute items-center justify-center flex bottom-4 left-4 right-4 backdrop-blur-md rounded-xl p-6 border border-orchi-gray/20">
                  <h3 className="tactical-text text-2xl text-white">{fullscreenImage.title}</h3>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default GalleryPage;
