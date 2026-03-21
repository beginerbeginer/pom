import { palette } from "./palette.js";

// ============================================================
// Page 24: Pyramid Node Test
// テスト対象: PyramidNode - direction, levels, fontSize, bold, textColor
// ============================================================
export const page24PyramidXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 24: Pyramid Node Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Basic Pyramid (direction=up, 3 layers):</Text>
      <Pyramid direction="up" w="600" h="200">
        <PyramidLevel label="戦略" color="E91E63" />
        <PyramidLevel label="戦術" color="9C27B0" />
        <PyramidLevel label="実行" color="673AB7" />
      </Pyramid>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontSize="14" bold="true">Inverted Pyramid (direction=down):</Text>
        <Pyramid direction="down" w="500" h="200">
          <PyramidLevel label="Top" color="4472C4" />
          <PyramidLevel label="Middle" color="5B9BD5" />
          <PyramidLevel label="Bottom" color="70AD47" />
        </Pyramid>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontSize="14" bold="true">5 Layers with custom textColor:</Text>
        <Pyramid direction="up" w="500" h="250">
          <PyramidLevel label="Self-actualization" color="F44336" textColor="FFFFFF" />
          <PyramidLevel label="Esteem" color="FF9800" textColor="333333" />
          <PyramidLevel label="Love/Belonging" color="FFEB3B" textColor="333333" />
          <PyramidLevel label="Safety" color="4CAF50" textColor="FFFFFF" />
          <PyramidLevel label="Physiological" color="2196F3" textColor="FFFFFF" />
        </Pyramid>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Bold text &amp; custom fontSize:</Text>
      <Pyramid direction="up" w="800" h="180" fontSize="18" bold="true">
        <PyramidLevel label="Vision" color="1D4ED8" />
        <PyramidLevel label="Strategy" color="2563EB" />
        <PyramidLevel label="Tactics" color="3B82F6" />
        <PyramidLevel label="Operations" color="60A5FA" />
      </Pyramid>
    </VStack>
  </Box>
</VStack>
`;
