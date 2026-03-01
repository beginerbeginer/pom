import { palette } from "./palette.js";

// ============================================================
// Page 5: Shape Test
// テスト対象: shapeType, fill, line, shadow, text
// ============================================================
export const page5ShapeXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 5: Shape Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">shapeType variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">rect</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="ellipse" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">ellipse</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="triangle" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">triangle</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="roundRect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">roundRect</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">fill &amp; line combinations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.blue}"}' />
          <Text fontPx="12">fill only</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">line only</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">fill + line</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">line.dashType variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"solid"}' />
          <Text fontPx="12">solid</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"dash"}' />
          <Text fontPx="12">dash</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"dashDot"}' />
          <Text fontPx="12">dashDot</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Shape with text:</Text>
      <HStack gap="24" alignItems="center">
        <Shape shapeType="ellipse" w="80" h="80" fontPx="14" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}'>Circle</Shape>
        <Shape shapeType="rect" w="100" h="50" fontPx="14" bold="true" fill='{"color":"${palette.navy}"}' color="FFFFFF">Rectangle</Shape>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">fontFamily &amp; lineSpacingMultiple:</Text>
      <HStack gap="24" alignItems="center">
        <Shape shapeType="rect" w="140" h="50" fontPx="14" fontFamily="Arial" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":1}'>Arial Font</Shape>
        <Shape shapeType="rect" w="140" h="80" fontPx="14" lineSpacingMultiple="2.0" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":1}'>Line 1\nLine 2\nLine 3</Shape>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;
