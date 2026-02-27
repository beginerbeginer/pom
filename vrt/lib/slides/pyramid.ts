import { palette } from "./palette";

// ============================================================
// Page 24: Pyramid Node Test
// テスト対象: PyramidNode - direction, levels, fontPx, bold, textColor
// ============================================================
export const page24PyramidXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 24: Pyramid Node Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Basic Pyramid (direction=up, 3 layers):</Text>
      <Pyramid direction="up" w="600" h="200">
        <Level label="戦略" color="E91E63" />
        <Level label="戦術" color="9C27B0" />
        <Level label="実行" color="673AB7" />
      </Pyramid>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Inverted Pyramid (direction=down):</Text>
        <Pyramid direction="down" w="500" h="200">
          <Level label="Top" color="4472C4" />
          <Level label="Middle" color="5B9BD5" />
          <Level label="Bottom" color="70AD47" />
        </Pyramid>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">5 Layers with custom textColor:</Text>
        <Pyramid direction="up" w="500" h="250">
          <Level label="Self-actualization" color="F44336" textColor="FFFFFF" />
          <Level label="Esteem" color="FF9800" textColor="333333" />
          <Level label="Love/Belonging" color="FFEB3B" textColor="333333" />
          <Level label="Safety" color="4CAF50" textColor="FFFFFF" />
          <Level label="Physiological" color="2196F3" textColor="FFFFFF" />
        </Pyramid>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Bold text &amp; custom fontPx:</Text>
      <Pyramid direction="up" w="800" h="180" fontPx="18" bold="true">
        <Level label="Vision" color="1D4ED8" />
        <Level label="Strategy" color="2563EB" />
        <Level label="Tactics" color="3B82F6" />
        <Level label="Operations" color="60A5FA" />
      </Pyramid>
    </VStack>
  </Box>
</VStack>
`;
