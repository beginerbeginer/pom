import { palette } from "./palette.js";

// ============================================================
// Page 20: Background Image Test
// テスト対象: backgroundImage (cover / contain)
// ============================================================
export const page20BackgroundImageXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 20: Background Image Test</Text>
  <!-- backgroundImage sizing modes -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="16" color="${palette.charcoal}" bold="true">Background Image Sizing Modes:</Text>
      <HStack gap="16">
        <!-- cover モード -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"cover"}' border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">cover</Text>
        </Box>
        <!-- contain モード -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"contain"}' backgroundColor="333333" border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">contain (with backgroundColor)</Text>
        </Box>
        <!-- デフォルト（cover） -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_1.png"}' border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">default (cover)</Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
  <!-- VStack with backgroundImage -->
  <VStack gap="8" padding="16" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"cover"}' border='{"color":"${palette.border}","width":1}'>
    <Text fontPx="16" color="FFFFFF" bold="true">VStack with backgroundImage</Text>
    <Text fontPx="14" color="FFFFFF">Background image on VStack container</Text>
  </VStack>
</VStack>
`;
