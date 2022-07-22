import { Box, Container, HStack, ColorMode, Flex, Stack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (

    <Link href="/">
      <Stack as="a" cursor={"pointer"} >
        <Image src="/logo.svg" width={"200"} height={"81"}/>
      </Stack>
    </Link>

  )
}

export default Logo