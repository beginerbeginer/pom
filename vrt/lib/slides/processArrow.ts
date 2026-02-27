import { palette } from "./palette";

// ============================================================
// Page 14: ProcessArrow Node Test
// テスト対象: ProcessArrowNode - direction, steps, itemWidth, itemHeight, gap
// ============================================================
export const page14ProcessArrowXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 14: ProcessArrow Node Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Horizontal Process Arrow (5 steps with colors):</Text>
      <ProcessArrow direction="horizontal" w="1100" h="80">
        <Step label="企画" color="#4472C4" />
        <Step label="設計" color="#5B9BD5" />
        <Step label="開発" color="#70AD47" />
        <Step label="テスト" color="#FFC000" />
        <Step label="リリース" color="#ED7D31" />
      </ProcessArrow>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">3 Steps (Auto width):</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Input" />
          <Step label="Process" />
          <Step label="Output" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Single Step:</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Only One Step" color="#E91E63" />
        </ProcessArrow>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Custom itemWidth, itemHeight &amp; fontPx:</Text>
      <ProcessArrow direction="horizontal" w="1100" h="100" itemWidth="200" itemHeight="80" fontPx="18" bold="true">
        <Step label="Step 1" color="#2196F3" />
        <Step label="Step 2" color="#00BCD4" />
        <Step label="Step 3" color="#009688" />
      </ProcessArrow>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Vertical Process Arrow:</Text>
        <ProcessArrow direction="vertical" w="200" h="250">
          <Step label="Phase 1" color="#4CAF50" />
          <Step label="Phase 2" color="#2196F3" />
          <Step label="Phase 3" color="#9C27B0" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Custom textColor:</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Light BG" color="#FFEB3B" textColor="#333333" />
          <Step label="Dark BG" color="#1E293B" textColor="#FFFFFF" />
          <Step label="Blue BG" color="#1D4ED8" textColor="#FFFFFF" />
        </ProcessArrow>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
