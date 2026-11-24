"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PixelWindow } from "@/components/ui/PixelWindow";
import { PixelMusicNoteIcon } from "@/components/ui/PixelIcons";
import { ShreeSprite } from "@/components/character/ShreeSprite";
import { SOUNDTRACK_TRACKS, type TrackItem } from "@/data/interests";

export function SoundtrackChapter() {
  const [selectedTrack, setSelectedTrack] = useState<TrackItem>(
    SOUNDTRACK_TRACKS[0]
  );
  const [isPlayingTone, setIsPlayingTone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlayingTone(false);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const playChordPulse = (freqs: number[], muted: boolean) => {
    if (muted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    freqs.forEach((hz, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(hz, now + idx * 0.08);
      gain.gain.setValueAtTime(0.0001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.028, now + idx * 0.08 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.2);
    });
  };

  const togglePlay = () => {
    if (isPlayingTone) {
      stopAudio();
      return;
    }
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      setIsPlayingTone(true);
      playChordPulse(selectedTrack.chordHz, isMuted);
      intervalRef.current = setInterval(() => {
        playChordPulse(selectedTrack.chordHz, isMuted);
      }, 2200);
    } catch {
      setIsPlayingTone(false);
    }
  };

  const handleSelectTrack = (track: TrackItem) => {
    setSelectedTrack(track);
    if (isPlayingTone) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      playChordPulse(track.chordHz, isMuted);
      intervalRef.current = setInterval(() => {
        playChordPulse(track.chordHz, isMuted);
      }, 2200);
    }
  };

  return (
    <section
      id="the-soundtrack"
      aria-labelledby="soundtrack-heading"
      className="bg-porcelain-soft border-b border-ink/15 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Editorial Intro & Pixel Music Player */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <SectionLabel chapterNumber="05" label="The soundtrack · Music" />
              <h2
                id="soundtrack-heading"
                className="font-editorial text-4xl sm:text-5xl text-ink leading-[1.06]"
              >
                The playlist is part of the process.{" "}
                <span className="text-burgundy">Obviously.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-ink/82 leading-relaxed max-w-[46ch]">
                Music sets the tempo for everything I make — from BTS and K-pop
                production details to Taylor Swift storytelling, Sabrina
                Carpenter momentum, and quiet lo-fi instrumentals for late-night
                debugging.
              </p>
            </div>

            <PixelWindow
              title="SHREE_DECK_05"
              badge={isPlayingTone ? "AMBIENT ON" : "MUTED"}
            >
              <div className="flex items-center gap-4 pb-4 border-b border-ink/15">
                <div className="bg-porcelain border border-ink/20 px-2 pt-2 pb-0 shrink-0">
                  <ShreeSprite
                    pose={isPlayingTone ? "headphones" : "idle"}
                    size="md"
                    alt="Shree.exe listening to music with headphones"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-burgundy block tabular-nums">
                    Track {selectedTrack.number}
                  </span>
                  <h3 className="font-editorial text-2xl text-ink truncate">
                    {selectedTrack.title}
                  </h3>
                  <p className="text-xs font-medium text-ink/80">
                    {selectedTrack.artist}
                  </p>
                  <span className="inline-block text-xs px-2 py-0.5 bg-powder-pink/45 text-ink font-semibold mt-1">
                    {selectedTrack.mood}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-sm text-ink/85 leading-relaxed">
                  {selectedTrack.note}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 bg-ink text-porcelain text-xs font-semibold hover:bg-burgundy transition-colors cursor-pointer"
                  >
                    {isPlayingTone ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        Stop ambient chime
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        Play mood chime
                      </>
                    )}
                  </button>

                  {isPlayingTone && (
                    <button
                      type="button"
                      onClick={() => setIsMuted((m) => !m)}
                      aria-label={isMuted ? "Unmute chime" : "Mute chime"}
                      className="inline-flex items-center gap-1.5 min-h-[42px] px-3 py-2 border border-ink/30 text-xs font-medium hover:border-burgundy cursor-pointer"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-burgundy" />
                          Muted
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          Sound on
                        </>
                      )}
                    </button>
                  )}

                  <a
                    href={selectedTrack.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-burgundy hover:underline"
                  >
                    Listen on Spotify
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </PixelWindow>
          </div>

          {/* Right: Editorial Tracklist */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-ink/15 text-xs text-stone-text uppercase tracking-wider font-semibold">
              <span>Curated Rotation</span>
              <span>Opt-in audio · Outbound links</span>
            </div>

            {SOUNDTRACK_TRACKS.map((track) => {
              const active = selectedTrack.id === track.id;
              return (
                <div
                  key={track.id}
                  className={`p-5 border transition-all ${
                    active
                      ? "bg-porcelain border-ink shadow-[0_8px_20px_-10px_rgba(36,32,31,0.28)]"
                      : "bg-porcelain/70 border-ink/15 hover:border-burgundy"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectTrack(track)}
                      className="text-left flex items-start gap-4 cursor-pointer flex-1"
                    >
                      <span
                        className={`text-xs font-bold mt-1.5 tabular-nums ${
                          active ? "text-burgundy" : "text-stone-text"
                        }`}
                      >
                        {track.number}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-2xl text-ink">
                            {track.title}
                          </h3>
                          {active && (
                            <PixelMusicNoteIcon
                              size={14}
                              className="text-burgundy"
                            />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-ink/80">
                          {track.artist} ·{" "}
                          <span className="text-burgundy">{track.mood}</span>
                        </p>
                        <p className="text-xs sm:text-[13px] text-ink/78 leading-relaxed pt-1 max-w-[54ch]">
                          {track.note}
                        </p>
                      </div>
                    </button>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pl-8 sm:pl-0">
                      <span className="font-mono text-xs text-stone-text tabular-nums">
                        {track.duration}
                      </span>
                      <a
                        href={track.searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-ink hover:text-burgundy underline"
                      >
                        Open
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
