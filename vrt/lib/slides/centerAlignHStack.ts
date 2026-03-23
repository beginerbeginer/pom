import { palette } from "./palette.js";

// ============================================================
// Page 32: Center-aligned VStack with HStack children
// テスト対象: VStack alignItems="center" 配下の HStack でテキストの幅が潰れないこと
// ============================================================
export const page32CenterAlignHStackXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 32: Center-Align HStack</Text>

  <!-- VStack alignItems="center" 配下の HStack -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">VStack alignItems="center" with HStack child:</Text>
      <VStack gap="14" alignItems="center">
        <HStack gap="10" alignItems="center">
          <Box w="42" h="42" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
          <Text fontSize="20" bold="true">Title text should not wrap</Text>
        </HStack>
        <Text fontSize="14">Description text below centered HStack</Text>
      </VStack>
    </VStack>
  </Box>

  <!-- Box -> VStack alignItems="center" -> HStack のネスト -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">Box -> VStack center -> HStack nesting:</Text>
      <HStack gap="16" alignItems="stretch">
        <Box w="50%" padding="16" backgroundColor="${palette.lightBlue}">
          <VStack gap="10" alignItems="center">
            <HStack gap="8" alignItems="center">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text="" fontSize="10"></Text></Box>
              <Text fontSize="16" bold="true">Left panel title</Text>
            </HStack>
            <Text fontSize="12">Left panel description text</Text>
          </VStack>
        </Box>
        <Box w="50%" padding="16" backgroundColor="${palette.lightBlue}">
          <VStack gap="10" alignItems="center">
            <HStack gap="8" alignItems="center">
              <Box w="30" h="30" backgroundColor="${palette.green}"><Text text="" fontSize="10"></Text></Box>
              <Text fontSize="16" bold="true">Right panel title</Text>
            </HStack>
            <Text fontSize="12">Right panel description text</Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  </Box>

  <!-- VStack alignItems="start" / "end" でも同様に動作すること -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">VStack alignItems="start" and "end":</Text>
      <HStack gap="16" alignItems="stretch">
        <Box w="50%" padding="16" backgroundColor="${palette.lightBlue}">
          <VStack gap="10" alignItems="start">
            <HStack gap="8" alignItems="center">
              <Box w="30" h="30" backgroundColor="${palette.red}"><Text text="" fontSize="10"></Text></Box>
              <Text fontSize="16" bold="true">alignItems="start"</Text>
            </HStack>
            <Text fontSize="12">Text under start-aligned HStack</Text>
          </VStack>
        </Box>
        <Box w="50%" padding="16" backgroundColor="${palette.lightBlue}">
          <VStack gap="10" alignItems="end">
            <HStack gap="8" alignItems="center">
              <Box w="30" h="30" backgroundColor="${palette.accent}"><Text text="" fontSize="10"></Text></Box>
              <Text fontSize="16" bold="true">alignItems="end"</Text>
            </HStack>
            <Text fontSize="12">Text under end-aligned HStack</Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
