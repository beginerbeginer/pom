import { palette } from "./palette.js";

// ============================================================
// Page 8: Common Properties Test
// テスト対象: w/h, padding, backgroundColor, border
// ============================================================
export const page8CommonXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 8: Common Properties Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">w/h variations:</Text>
      <HStack gap="16" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          <Text fontSize="12">w:80, h:40</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="30%" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          <Text fontSize="12">w:"30%"</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">padding variations:</Text>
      <HStack gap="16" alignItems="start">
        <VStack gap="4" alignItems="center">
          <Box padding="8" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontSize="12">padding: 8</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box padding="24" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontSize="12">padding: 24</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box padding.top="20" padding.right="8" padding.bottom="4" padding.left="8" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontSize="12">top:20, bottom:4</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">border variations:</Text>
      <HStack gap="16" alignItems="center">
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border.color="${palette.charcoal}" border.width="1"><Text text=""></Text></Box>
          <Text fontSize="12">width: 1</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border.color="${palette.charcoal}" border.width="3"><Text text=""></Text></Box>
          <Text fontSize="12">width: 3</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border.color="${palette.blue}" border.width="2"><Text text=""></Text></Box>
          <Text fontSize="12">color: blue</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">backgroundColor variations:</Text>
      <HStack gap="16" alignItems="center">
        <Box w="80" h="40" backgroundColor="${palette.lightBlue}"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.navy}" borderRadius="8"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.blue}" borderRadius="16"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.green}" borderRadius="20"><Text text=""></Text></Box>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
