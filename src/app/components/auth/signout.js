'use client';
'use client'

import {
  
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack
  
  } from "@chakra-ui/react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignOut() {
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    }
  }

  return (
    <MenuItem  onClick={handleSignOut}>
      Sign Out
    </MenuItem>
  );
}