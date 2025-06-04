'use client';

import { useEffect, useRef, useState } from 'react';
import TeamMember from '@/types/team-member';
import dayjs from 'dayjs';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ControlGroup, ControlGroupItem } from '@/components/ui/control-group';
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from '@/components/ui/input-base';
import { useAuth } from '@/lib/auth-context';
import { Textarea } from '../ui/textarea';

interface TeamMemberEditProps {
  onCancelEdit: () => void;
  onUpdated: (updatedTeamMember: TeamMember) => void;
  teamMember: TeamMember;
}

const TeamMemberEdit = ({
  onCancelEdit,
  onUpdated,
  teamMember,
}: TeamMemberEditProps) => {
  const { profile } = useAuth();

  const [editedTeamMember, setEditedTeamMember] = useState<TeamMember>({
    ...teamMember,
  });

  const editBioRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editBioRef.current) {
      editBioRef.current.style.height = 'auto';
      editBioRef.current.style.height = `${editBioRef.current.scrollHeight}px`;
    }
  }, []);

  const handelTeamMemberUpdate = async () => {
    try {
      const { error: memberError } = await supabase
        .from('team_members')
        .update({
          achivements: editedTeamMember.achivements,
          bio: editedTeamMember.bio,
          field_name: editedTeamMember.field_name,
          name: editedTeamMember.name,
          role: editedTeamMember.role,
        })
        .eq('id', editedTeamMember.id);

      if (memberError) throw memberError;

      if (editedTeamMember.team_member_socials) {
        const socialPayload = {
          ...editedTeamMember.team_member_socials,
          id: editedTeamMember.soical_id,
        } as any;

        const { error: socialsError } = await supabase
          .from('team_member_socials')
          .upsert(socialPayload, { onConflict: 'id' });

        if (socialsError) throw socialsError;
      }

      if (editedTeamMember.team_member_equipment) {
        const equipmentPayload = {
          ...editedTeamMember.team_member_equipment,
          id: editedTeamMember.equipment_id,
        } as any;

        const { error: equipmentError } = await supabase
          .from('team_member_equipment')
          .upsert(equipmentPayload, { onConflict: 'id' });

        if (equipmentError) throw equipmentError;
      }

      onUpdated(editedTeamMember);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  return (
    <main className="pt-24 pb-28">
      <div className="container mx-auto px-4 mt-8">
        <div className="mb-6 w-full justify-between flex items-center">
          <Link
            className="inline-flex items-center tactical-text text-orchi-light hover:text-orchi-gold transition-colors"
            href="/team"
          >
            <ArrowLeft size={16} className="mr-1" />
            TORNA ALLA SQUADRA
          </Link>

          <div className="flex flex-row gap-2">
            <Button
              className="cursor-pointer bg-orchi-red hover:bg-orchi-gold tactical-text transition-colors duration-300"
              onClick={handelTeamMemberUpdate}
              size="sm"
            >
              CONFERMA MODIFICHE
            </Button>

            <Button
              className="cursor-pointer bg-transparent block w-full text-center tactical-text text-orchi-gold border border-orchi-gold hover:bg-orchi-gold/10 transition-colors"
              onClick={onCancelEdit}
              size="sm"
            >
              ANNULLA MODIFICHE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <Card className="overflow-hidden bg-orchi-gray/10 border border-orchi-gray mb-6 sticky top-24">
              <div className="aspect-square overflow-hidden">
                <Button
                  className="cursor-pointer absolute top-2 right-2 bg-orchi-gold hover:bg-orchi-gold/80 tactical-text opacity-80 hover:opacity-100"
                  size="sm"
                >
                  MODIFICA
                </Button>

                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${teamMember?.image_url || '/team-member-placeholder.webp'})`,
                  }}
                />
              </div>

              <CardContent className="p-6">
                <div className="mb-4 flex items-center">
                  <User size={20} className="text-orchi-red mr-2" />

                  <Input
                    className="tactical-text text-2xl h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    onChange={(e) =>
                      setEditedTeamMember((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    value={editedTeamMember.name || ''}
                  />
                </div>

                <Input
                  className="text-orchi-red mb-4 font-semibold text-sm h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                  onChange={(e) =>
                    setEditedTeamMember((prev) => ({
                      ...prev,
                      field_name: e.target.value,
                    }))
                  }
                  value={editedTeamMember.field_name || ''}
                />

                <div className="flex items-center mb-4">
                  <span className="text-orchi-light/80 text-sm mr-2">
                    Ruolo:
                  </span>

                  {profile?.teamMember?.is_admin ? (
                    <Select
                      defaultValue={editedTeamMember.role}
                      onValueChange={(value) =>
                        setEditedTeamMember((prev) => ({
                          ...prev,
                          role: value as any,
                        }))
                      }
                    >
                      <SelectTrigger className="cursor-pointer rounded-md border border-orchi-gray bg-orchi-gray/20 text-orchi-gold h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none">
                        <SelectValue placeholder="Ruolo" />
                      </SelectTrigger>

                      <SelectContent className="rounded-md border border-orchi-gray bg-[#1d1d1d]">
                        <SelectItem
                          className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                          value="president"
                        >
                          Presidente
                        </SelectItem>
                        <SelectItem
                          className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                          value="vice_president"
                        >
                          Vice Presidente
                        </SelectItem>
                        <SelectItem
                          className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                          value="advisor"
                        >
                          Consigliere
                        </SelectItem>
                        <SelectItem
                          className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                          value="secretary"
                        >
                          Segretario
                        </SelectItem>
                        <SelectItem
                          className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                          value="member"
                        >
                          Socio
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="text-orchi-gold">
                      {teamMember?.role === 'president'
                        ? 'Presidente'
                        : teamMember?.role === 'vice_president'
                          ? 'Vice Presidente'
                          : teamMember?.role === 'advisor'
                            ? 'Consigliere'
                            : teamMember?.role === 'secretary'
                              ? 'Segretario'
                              : teamMember?.role === 'member'
                                ? 'Socio'
                                : ''}
                    </span>
                  )}
                </div>

                <div className="text-orchi-light/60 text-sm mb-1">
                  Membro dal
                </div>

                <Select
                  defaultValue={editedTeamMember.year_joined.toString()}
                  onValueChange={(value) =>
                    setEditedTeamMember((prev) => ({
                      ...prev,
                      year_joined: value as any,
                    }))
                  }
                >
                  <SelectTrigger className="mb-6 cursor-pointer rounded-md border border-orchi-gray bg-orchi-gray/20 text-orchi-light text-md h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none">
                    <SelectValue placeholder="Anno" />
                  </SelectTrigger>

                  <SelectContent className="rounded-md border border-orchi-gray bg-[#1d1d1d]">
                    {Array.from(
                      { length: dayjs().year() - 2007 + 1 },
                      (_, i) => dayjs().year() - i,
                    ).map((year) => (
                      <SelectItem
                        className="text-orchi-gold focus:bg-orchi-red focus:text-white focus:cursor-pointer"
                        value={year.toString()}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="pt-2">
                  <p className="text-orchi-light/60 text-sm mb-2">Social</p>

                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger className="text-orchi-light/80 hover:text-orchi-gold transition-colors">
                        Instagram
                      </PopoverTrigger>

                      <PopoverContent className="space-y-2 rounded-md border border-orchi-gray bg-[#1d1d1d] w-auto max-w-screen">
                        <p className="text-orchi-light">Inserisci link:</p>

                        <ControlGroup>
                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseAdornment className="text-orchi-light/60">
                                https://instagram.com/
                              </InputBaseAdornment>
                            </InputBase>
                          </ControlGroupItem>

                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseControl>
                                <InputBaseInput
                                  className="text-orchi-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                  onChange={(e) => {
                                    const updatedSocials = {
                                      ...editedTeamMember.team_member_socials,
                                    };

                                    updatedSocials.instagram = e.target.value;

                                    setEditedTeamMember((prev) => ({
                                      ...prev,
                                      team_member_socials: updatedSocials,
                                    }));
                                  }}
                                  value={
                                    editedTeamMember?.team_member_socials
                                      .instagram
                                  }
                                />
                              </InputBaseControl>
                            </InputBase>
                          </ControlGroupItem>
                        </ControlGroup>

                        <p className="text-orchi-light/60 text-sm">
                          Inserendo un campo vuoto, il collegamento a Instagram
                          non verrà mostrato nel profilo.
                        </p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className="space-y-2 text-orchi-light/80 hover:text-orchi-gold transition-colors">
                        Facebook
                      </PopoverTrigger>

                      <PopoverContent className="rounded-md border border-orchi-gray bg-[#1d1d1d] w-auto max-w-screen">
                        <p className="text-orchi-light">Inserisci link:</p>

                        <ControlGroup>
                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseAdornment className="text-orchi-light/60">
                                https://facebook.com/
                              </InputBaseAdornment>
                            </InputBase>
                          </ControlGroupItem>

                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseControl>
                                <InputBaseInput
                                  className="text-orchi-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                  onChange={(e) => {
                                    const updatedSocials = {
                                      ...editedTeamMember.team_member_socials,
                                    };

                                    updatedSocials.facebook = e.target.value;

                                    setEditedTeamMember((prev) => ({
                                      ...prev,
                                      team_member_socials: updatedSocials,
                                    }));
                                  }}
                                  value={
                                    editedTeamMember?.team_member_socials
                                      .facebook
                                  }
                                />
                              </InputBaseControl>
                            </InputBase>
                          </ControlGroupItem>
                        </ControlGroup>

                        <p className="text-orchi-light/60 text-sm">
                          Inserendo un campo vuoto, il collegamento a Facebook
                          non verrà mostrato nel profilo.
                        </p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className="text-orchi-light/80 hover:text-orchi-gold transition-colors">
                        Twitter/X
                      </PopoverTrigger>

                      <PopoverContent className="space-y-2 rounded-md border border-orchi-gray bg-[#1d1d1d] w-auto max-w-screen">
                        <p className="text-orchi-light">Inserisci link:</p>

                        <ControlGroup>
                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseAdornment className="text-orchi-light/60">
                                https://twitter.com/
                              </InputBaseAdornment>
                            </InputBase>
                          </ControlGroupItem>

                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseControl>
                                <InputBaseInput
                                  className="text-orchi-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                  onChange={(e) => {
                                    const updatedSocials = {
                                      ...editedTeamMember.team_member_socials,
                                    };

                                    updatedSocials.twitter = e.target.value;

                                    setEditedTeamMember((prev) => ({
                                      ...prev,
                                      team_member_socials: updatedSocials,
                                    }));
                                  }}
                                  value={
                                    editedTeamMember?.team_member_socials
                                      .twitter
                                  }
                                />
                              </InputBaseControl>
                            </InputBase>
                          </ControlGroupItem>
                        </ControlGroup>

                        <p className="text-orchi-light/60 text-sm">
                          Inserendo un campo vuoto, il collegamento a Twitter/X
                          non verrà mostrato nel profilo.
                        </p>
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger className="text-orchi-light/80 hover:text-orchi-gold transition-colors">
                        YouTube
                      </PopoverTrigger>

                      <PopoverContent className="space-y-2 rounded-md border border-orchi-gray bg-[#1d1d1d] w-auto max-w-screen">
                        <p className="text-orchi-light">Inserisci link:</p>

                        <ControlGroup>
                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseAdornment className="text-orchi-light/60">
                                https://youtube.com/
                              </InputBaseAdornment>
                            </InputBase>
                          </ControlGroupItem>

                          <ControlGroupItem>
                            <InputBase>
                              <InputBaseControl>
                                <InputBaseInput
                                  className="text-orchi-light focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                  onChange={(e) => {
                                    const updatedSocials = {
                                      ...editedTeamMember.team_member_socials,
                                    };

                                    updatedSocials.youtube = e.target.value;

                                    setEditedTeamMember((prev) => ({
                                      ...prev,
                                      team_member_socials: updatedSocials,
                                    }));
                                  }}
                                  value={
                                    editedTeamMember?.team_member_socials
                                      .youtube
                                  }
                                />
                              </InputBaseControl>
                            </InputBase>
                          </ControlGroupItem>
                        </ControlGroup>

                        <p className="text-orchi-light/60 text-sm">
                          Inserendo un campo vuoto, il collegamento a YouTube
                          non verrà mostrato nel profilo.
                        </p>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-orchi-gray/10 border border-orchi-gray p-6 mb-6">
              <h2 className="tactical-text text-2xl text-orchi-light mb-4">
                BIOGRAFIA
              </h2>
              <Textarea
                className="text-orchi-light/80 resize-none overflow-hidden min-h-fit text-md h-auto mb-8 p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                onChange={(e) => {
                  if (editBioRef.current) {
                    editBioRef.current.style.height = 'auto';
                    editBioRef.current.style.height = `${editBioRef.current.scrollHeight}px`;
                  }

                  setEditedTeamMember((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }));
                }}
                ref={editBioRef}
                value={editedTeamMember.bio || ''}
              />
              <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                ACHIEVEMENTS
              </h3>
              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-1 pl-4 text-orchi-light/80">
                  {editedTeamMember?.achivements?.map((item, index) => (
                    <li key={index}>
                      <span
                        className="inline-flex gap-2"
                        style={{
                          width: 'calc(100% - 1rem)',
                        }}
                      >
                        <Input
                          className="inline-block align-baseline text-sm h-auto p-0 px-2 my-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                          onChange={(e) => {
                            const updatedAttachments = [
                              ...(editedTeamMember.achivements || []),
                            ];

                            updatedAttachments[index] = e.target.value;

                            setEditedTeamMember((prev) => ({
                              ...prev,
                              achivements: updatedAttachments,
                            }));
                          }}
                          value={item || ''}
                        />

                        <Button
                          className="cursor-pointer bg-transparent block text-center tactical-text text-orchi-gold border border-orchi-gold hover:bg-orchi-gold/10 transition-colors"
                          onClick={() => {
                            let updatedAttachments = [
                              ...(editedTeamMember.achivements || []),
                            ];

                            updatedAttachments = updatedAttachments.filter(
                              (_, i) => i !== index,
                            );

                            setEditedTeamMember((prev) => ({
                              ...prev,
                              achivements: updatedAttachments,
                            }));
                          }}
                          size="sm"
                        >
                          RIMUOVI
                        </Button>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="cursor-pointer mb-8 w-full bg-orchi-red hover:bg-orchi-gold tactical-text transition-colors duration-300"
                  onClick={() => {
                    const updatedAttachments = [
                      ...(editedTeamMember.achivements || []),
                    ];

                    updatedAttachments.push('');

                    setEditedTeamMember((prev) => ({
                      ...prev,
                      achivements: updatedAttachments,
                    }));
                  }}
                  size="sm"
                >
                  AGGIUNGI ALTRO ACHIVEMENT
                </Button>
              </div>
              <h3 className="tactical-text text-xl text-orchi-gold mb-2">
                EQUIPAGGIAMENTO
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-orchi-light/60 text-sm">
                    Replica Primaria
                  </div>

                  <Input
                    className="text-sm h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    onChange={(e) =>
                      setEditedTeamMember((prev) => ({
                        ...prev,
                        team_member_equipment: {
                          ...prev.team_member_equipment,
                          primary: e.target.value,
                        },
                      }))
                    }
                    value={editedTeamMember.team_member_equipment.primary || ''}
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-orchi-light/60 text-sm">
                    Replica Secondaria
                  </div>

                  <Input
                    className="text-sm h-auto p-0 px-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    onChange={(e) =>
                      setEditedTeamMember((prev) => ({
                        ...prev,
                        team_member_equipment: {
                          ...prev.team_member_equipment,
                          secondary: e.target.value,
                        },
                      }))
                    }
                    value={
                      editedTeamMember.team_member_equipment.secondary || ''
                    }
                  />
                </div>

                <div>
                  <div className="text-orchi-light/60 text-sm mb-1">Altro</div>

                  <ul className="list-disc list-inside space-y-1 pl-4 text-orchi-light/80">
                    {editedTeamMember?.team_member_equipment.other?.map(
                      (item, index) => (
                        <li key={index}>
                          <span
                            className="inline-flex gap-2"
                            style={{
                              width: 'calc(100% - 1rem)',
                            }}
                          >
                            <Input
                              className="inline-block align-baseline text-sm h-auto p-0 px-2 my-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                              onChange={(e) => {
                                const updatedEquipment = [
                                  ...(editedTeamMember.team_member_equipment
                                    .other || []),
                                ];

                                updatedEquipment[index] = e.target.value;

                                setEditedTeamMember((prev) => ({
                                  ...prev,
                                  team_member_equipment: {
                                    ...prev.team_member_equipment!,
                                    other: updatedEquipment,
                                  },
                                }));
                              }}
                              value={item || ''}
                            />

                            <Button
                              className="cursor-pointer bg-transparent block text-center tactical-text text-orchi-gold border border-orchi-gold hover:bg-orchi-gold/10 transition-colors"
                              onClick={() => {
                                let updatedEquipment = [
                                  ...(editedTeamMember.team_member_equipment
                                    .other || []),
                                ];

                                updatedEquipment = updatedEquipment.filter(
                                  (_, i) => i !== index,
                                );

                                setEditedTeamMember((prev) => ({
                                  ...prev,
                                  team_member_equipment: {
                                    ...prev.team_member_equipment!,
                                    other: updatedEquipment,
                                  },
                                }));
                              }}
                              size="sm"
                            >
                              RIMUOVI
                            </Button>
                          </span>
                        </li>
                      ),
                    )}
                  </ul>

                  <Button
                    className="cursor-pointer mt-4 w-full bg-orchi-red hover:bg-orchi-gold tactical-text transition-colors duration-300"
                    onClick={() => {
                      const updatedEquipment = [
                        ...(editedTeamMember.team_member_equipment.other || []),
                      ];

                      updatedEquipment.push('');

                      setEditedTeamMember((prev) => ({
                        ...prev,
                        team_member_equipment: {
                          ...prev.team_member_equipment!,
                          other: updatedEquipment,
                        },
                      }));
                    }}
                    size="sm"
                  >
                    AGGIUNGI ALTRO EQUIPAGGIAMENTO
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TeamMemberEdit;
