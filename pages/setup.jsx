import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import SetupForm from '@components/SetupForm';
import useCheckAlreadyRegistered from '@hooks/useCheckAlreadyRegistered';
import useContract from '@hooks/useRegistryContract';
import useChildContract from '@hooks/useConfigSplitter';

import MainLayout from '@layouts/MainLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { child } from '@utils/constants';
import UpdateSplitter from '@components/UpdateSplitter';
import CreateSplitter from '@components/CreateSplitter';

const setup = () => {
    return (
        <MainLayout>
            <h1>SET UP!</h1>
        </MainLayout>
    )
}

export default setup