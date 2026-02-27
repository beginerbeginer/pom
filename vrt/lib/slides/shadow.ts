import { palette } from "./palette";

// ============================================================
// Page 19: Shadow Test
// テスト対象: Box shadow, Image shadow, Shape shadow
// ============================================================
export const page19ShadowXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 19: Shadow Test</Text>
  <!-- Box with outer shadow -->
  <HStack gap="24" alignItems="start">
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" borderRadius="8" shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: outer shadow</Text>
    </Box>
    <!-- Box with inner shadow -->
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" borderRadius="8" shadow='{"type":"inner","color":"000000","blur":4,"offset":2,"angle":315,"opacity":0.2}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: inner shadow</Text>
    </Box>
    <!-- Box with shadow + border -->
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.blue}","width":2}' borderRadius="8" shadow='{"type":"outer","color":"${palette.blue}","blur":8,"offset":4,"angle":315,"opacity":0.4}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: shadow + border</Text>
    </Box>
  </HStack>
  <!-- Shape with shadow (various shape types) -->
  <HStack gap="24" alignItems="start">
    <Shape shapeType="ellipse" w="150" h="100" fill='{"color":"${palette.lightBlue}"}' shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}' fontPx="12" color="${palette.charcoal}">Ellipse shadow</Shape>
    <Shape shapeType="roundRect" w="150" h="100" fill='{"color":"${palette.lightBlue}"}' shadow='{"type":"outer","color":"${palette.navy}","blur":10,"offset":5,"angle":270,"opacity":0.5}' fontPx="12" color="${palette.charcoal}">RoundRect shadow</Shape>
  </HStack>
  <!-- Image with shadow -->
  <HStack gap="24" alignItems="start">
    <Box w="180" h="120">
      <Image src="https://placehold.co/180x120/DBEAFE/1D4ED8?text=Shadow" w="180" h="120" shadow='{"type":"outer","color":"000000","blur":8,"offset":4,"angle":315,"opacity":0.4}' />
    </Box>
  </HStack>
  <!-- Box with shadow only (no background, no border) -->
  <HStack gap="24" alignItems="start">
    <Box w="200" h="80" padding="16" shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}'>
      <Text fontPx="14" color="${palette.charcoal}">Shadow only (no bg)</Text>
    </Box>
  </HStack>
</VStack>
`;
