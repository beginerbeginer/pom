import { palette } from "./palette.js";

// ============================================================
// Page 28: Layout V2 - margin, zIndex, position, alignSelf, flexWrap
// ============================================================
export const page28LayoutV2Xml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 28: Layout V2</Text>

  <!-- margin テスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">margin:</Text>
      <HStack gap="16" alignItems="start">
        <VStack gap="4" alignItems="center">
          <Box w="200" h="80" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="40" margin="16" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
          </Box>
          <Text fontSize="11">margin="16"</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="200" h="80" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="40" margin.top="8" margin.left="24" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
          </Box>
          <Text fontSize="11">margin.top="8" margin.left="24"</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <HStack gap="0" backgroundColor="${palette.lightBlue}" w="200" h="80">
            <Box w="50" h="40" margin="8" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
            <Box w="50" h="40" margin="8" backgroundColor="${palette.red}"><Text text="" fontSize="10"></Text></Box>
          </HStack>
          <Text fontSize="11">margin between siblings</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>

  <!-- zIndex テスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">zIndex:</Text>
      <HStack gap="32" alignItems="start">
        <VStack gap="4" alignItems="center">
          <Layer w="200" h="120" backgroundColor="${palette.lightBlue}">
            <Shape shapeType="rect" w="80" h="60" x="20" y="20" fill.color="${palette.blue}" color="FFFFFF" fontSize="12" zIndex="2">z:2</Shape>
            <Shape shapeType="rect" w="80" h="60" x="60" y="40" fill.color="${palette.red}" color="FFFFFF" fontSize="12" zIndex="1">z:1</Shape>
          </Layer>
          <Text fontSize="11">Blue(z:2) over Red(z:1)</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Layer w="200" h="120" backgroundColor="${palette.lightBlue}">
            <Shape shapeType="rect" w="80" h="60" x="20" y="20" fill.color="${palette.blue}" color="FFFFFF" fontSize="12" zIndex="1">z:1</Shape>
            <Shape shapeType="rect" w="80" h="60" x="60" y="40" fill.color="${palette.red}" color="FFFFFF" fontSize="12" zIndex="2">z:2</Shape>
          </Layer>
          <Text fontSize="11">Red(z:2) over Blue(z:1)</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>

  <!-- position absolute テスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">position="absolute":</Text>
      <HStack gap="32" alignItems="start">
        <VStack gap="4" alignItems="center">
          <VStack w="200" h="120" padding="8" gap="8" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.green}"><Text text="" fontSize="10"></Text></Box>
            <Box w="40" h="40" position="absolute" top="10" right="10" backgroundColor="${palette.red}"><Text text="" fontSize="10"></Text></Box>
          </VStack>
          <Text fontSize="11">absolute top/right badge</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <VStack w="200" h="120" padding="8" gap="8" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
            <Box w="180" h="30" position="absolute" bottom="0" left="0" backgroundColor="${palette.accent}"><Text fontSize="10" color="FFFFFF" textAlign="center">overlay footer</Text></Box>
          </VStack>
          <Text fontSize="11">absolute bottom overlay</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>

  <!-- alignSelf テスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">alignSelf:</Text>
      <VStack w="300" h="120" gap="4" padding="8" backgroundColor="${palette.lightBlue}" alignItems="start">
        <Box w="80" h="24" backgroundColor="${palette.blue}" alignSelf="start"><Text fontSize="10" color="FFFFFF" textAlign="center">start</Text></Box>
        <Box w="80" h="24" backgroundColor="${palette.green}" alignSelf="center"><Text fontSize="10" color="FFFFFF" textAlign="center">center</Text></Box>
        <Box w="80" h="24" backgroundColor="${palette.red}" alignSelf="end"><Text fontSize="10" color="FFFFFF" textAlign="center">end</Text></Box>
        <Box h="24" backgroundColor="${palette.accent}" alignSelf="stretch"><Text fontSize="10" color="FFFFFF" textAlign="center">stretch</Text></Box>
      </VStack>
    </VStack>
  </Box>

  <!-- flexWrap テスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">flexWrap:</Text>
      <HStack gap="16" alignItems="start">
        <VStack gap="4" alignItems="center">
          <HStack w="200" gap="8" padding="8" backgroundColor="${palette.lightBlue}" flexWrap="wrap">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.green}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.red}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.accent}"><Text text="" fontSize="10"></Text></Box>
          </HStack>
          <Text fontSize="11">wrap</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <HStack w="200" gap="8" padding="8" backgroundColor="${palette.lightBlue}" flexWrap="nowrap">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.green}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.red}"><Text text="" fontSize="10"></Text></Box>
            <Box w="60" h="30" backgroundColor="${palette.accent}"><Text text="" fontSize="10"></Text></Box>
          </HStack>
          <Text fontSize="11">nowrap (default)</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
