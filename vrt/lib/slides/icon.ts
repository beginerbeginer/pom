import { palette } from "./palette.js";

// ============================================================
// Page 25: Icon Test
// テスト対象: name, size, color
// ============================================================
export const page25IconXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 25: Icon Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">Icon variations (default size 24px):</Text>
      <HStack gap="16" alignItems="center">
        <VStack gap="4" alignItems="center">
          <Icon name="cpu" />
          <Text fontSize="10">cpu</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="database" />
          <Text fontSize="10">database</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="cloud" />
          <Text fontSize="10">cloud</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="server" />
          <Text fontSize="10">server</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="globe" />
          <Text fontSize="10">globe</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="user" />
          <Text fontSize="10">user</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="mail" />
          <Text fontSize="10">mail</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="search" />
          <Text fontSize="10">search</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="settings" />
          <Text fontSize="10">settings</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="star" />
          <Text fontSize="10">star</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">Size variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Icon name="heart" size="16" />
          <Text fontSize="10">16px</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="heart" size="24" />
          <Text fontSize="10">24px</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="heart" size="32" />
          <Text fontSize="10">32px</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="heart" size="48" />
          <Text fontSize="10">48px</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="heart" size="64" />
          <Text fontSize="10">64px</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">Color variations:</Text>
      <HStack gap="24" alignItems="center">
        <VStack gap="4" alignItems="center">
          <Icon name="zap" size="32" color="#000000" />
          <Text fontSize="10">#000000</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="zap" size="32" color="#${palette.blue}" />
          <Text fontSize="10">blue</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="zap" size="32" color="#${palette.red}" />
          <Text fontSize="10">red</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="zap" size="32" color="#${palette.green}" />
          <Text fontSize="10">green</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="zap" size="32" color="#${palette.navy}" />
          <Text fontSize="10">navy</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="12">
      <Text fontSize="14" bold="true">Business icons:</Text>
      <HStack gap="16" alignItems="center">
        <VStack gap="4" alignItems="center">
          <Icon name="briefcase" size="32" color="#${palette.navy}" />
          <Text fontSize="10">briefcase</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="building" size="32" color="#${palette.navy}" />
          <Text fontSize="10">building</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="bar-chart" size="32" color="#${palette.navy}" />
          <Text fontSize="10">bar-chart</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="trending-up" size="32" color="#${palette.green}" />
          <Text fontSize="10">trending-up</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="shield" size="32" color="#${palette.blue}" />
          <Text fontSize="10">shield</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="target" size="32" color="#${palette.red}" />
          <Text fontSize="10">target</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Icon name="lightbulb" size="32" color="#${palette.navy}" />
          <Text fontSize="10">lightbulb</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
