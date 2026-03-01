import { palette } from "./palette.js";

// ============================================================
// Page 3: Image Test
// テスト対象: src, w, h
// ============================================================
export const page3ImageXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 3: Image Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Size variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="60" h="60" />
          <Text fontPx="12">60x60</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_1.png" w="120" h="90" />
          <Text fontPx="12">120x90</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="180" h="135" />
          <Text fontPx="12">180x135</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Image with container styling:</Text>
      <HStack gap="16" alignItems="start">
        <Box padding="12" backgroundColor="${palette.lightBlue}" border='{"color":"${palette.blue}","width":2}'>
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="80" h="80" />
        </Box>
        <VStack gap="4">
          <Text fontPx="16" bold="true">Image in styled Box</Text>
          <Text fontPx="12">Box with padding, backgroundColor, border</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 3b: Image Sizing Test
// テスト対象: sizing (contain, cover, crop)
// ============================================================
export const page3bImageSizingXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 3b: Image Sizing Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Sizing modes:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"contain"}' />
          <Text fontPx="12">contain</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"cover"}' />
          <Text fontPx="12">cover</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"crop","w":100,"h":100,"x":10,"y":10}' />
          <Text fontPx="12">crop (100x100)</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
