import { palette } from "./palette.js";

// ============================================================
// Page 14: ProcessArrow Node Test
// テスト対象: ProcessArrowNode - direction, steps, itemWidth, itemHeight, gap
// ============================================================
export const page14ProcessArrowXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 14: ProcessArrow Node Test</Text>
  <VStack padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
    <Text fontSize="14" bold="true">Horizontal Process Arrow (5 steps with colors):</Text>
    <ProcessArrow direction="horizontal" w="1100" h="80">
      <ProcessArrowStep label="企画" color="#4472C4" />
      <ProcessArrowStep label="設計" color="#5B9BD5" />
      <ProcessArrowStep label="開発" color="#70AD47" />
      <ProcessArrowStep label="テスト" color="#FFC000" />
      <ProcessArrowStep label="リリース" color="#ED7D31" />
    </ProcessArrow>
  </VStack>
  <HStack gap="16" alignItems="stretch">
    <VStack w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
      <Text fontSize="14" bold="true">3 Steps (Auto width):</Text>
      <ProcessArrow direction="horizontal" w="500" h="60">
        <ProcessArrowStep label="Input" />
        <ProcessArrowStep label="Process" />
        <ProcessArrowStep label="Output" />
      </ProcessArrow>
    </VStack>
    <VStack w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
      <Text fontSize="14" bold="true">Single Step:</Text>
      <ProcessArrow direction="horizontal" w="500" h="60">
        <ProcessArrowStep label="Only One Step" color="#E91E63" />
      </ProcessArrow>
    </VStack>
  </HStack>
  <VStack padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
    <Text fontSize="14" bold="true">Custom itemWidth, itemHeight &amp; fontSize:</Text>
    <ProcessArrow direction="horizontal" w="1100" h="100" itemWidth="200" itemHeight="80" fontSize="18" bold="true">
      <ProcessArrowStep label="Step 1" color="#2196F3" />
      <ProcessArrowStep label="Step 2" color="#00BCD4" />
      <ProcessArrowStep label="Step 3" color="#009688" />
    </ProcessArrow>
  </VStack>
  <HStack gap="16" alignItems="stretch">
    <VStack w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
      <Text fontSize="14" bold="true">Vertical Process Arrow:</Text>
      <ProcessArrow direction="vertical" w="200" h="250">
        <ProcessArrowStep label="Phase 1" color="#4CAF50" />
        <ProcessArrowStep label="Phase 2" color="#2196F3" />
        <ProcessArrowStep label="Phase 3" color="#9C27B0" />
      </ProcessArrow>
    </VStack>
    <VStack w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
      <Text fontSize="14" bold="true">Custom textColor:</Text>
      <ProcessArrow direction="horizontal" w="500" h="60">
        <ProcessArrowStep label="Light BG" color="#FFEB3B" textColor="#333333" />
        <ProcessArrowStep label="Dark BG" color="#1E293B" textColor="#FFFFFF" />
        <ProcessArrowStep label="Blue BG" color="#1D4ED8" textColor="#FFFFFF" />
      </ProcessArrow>
    </VStack>
  </HStack>
</VStack>
`;
