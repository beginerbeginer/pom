import { palette } from "./palette";

// ============================================================
// Page 1: Text Node Test
// テスト対象: fontPx, color, alignText, bold, italic, underline, strike, highlight, fontFamily, lineSpacingMultiple
// ============================================================
export const page1TextXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 1: Text Node Test</Text>
  <!-- fontPx variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">fontPx:</Text>
      <HStack gap="24" alignItems="end">
        <Text fontPx="12">12px</Text>
        <Text fontPx="18">18px</Text>
        <Text fontPx="24">24px</Text>
        <Text fontPx="36">36px</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- color variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">color:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16" color="${palette.charcoal}">charcoal</Text>
        <Text fontPx="16" color="${palette.blue}">blue</Text>
        <Text fontPx="16" color="${palette.red}">red</Text>
        <Text fontPx="16" color="${palette.green}">green</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- alignText variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">alignText:</Text>
      <VStack gap="4">
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="left">left (default)</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="center">center</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="right">right</Text>
        </Box>
      </VStack>
    </VStack>
  </Box>
  <!-- bold variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">bold:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal text</Text>
        <Text fontPx="16" bold="true">Bold text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- italic variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">italic:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal text</Text>
        <Text fontPx="16" italic="true">Italic text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- underline variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">underline:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal</Text>
        <Text fontPx="16" underline="true">Underline (bool)</Text>
        <Text fontPx="16" underline='{"style":"wavy"}'>Underline (wavy)</Text>
        <Text fontPx="16" underline='{"style":"dbl","color":"DC2626"}'>Underline (dbl + color)</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- strike & highlight variations -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">strike:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontPx="16">Normal</Text>
          <Text fontPx="16" strike="true">Strike text</Text>
        </HStack>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">highlight:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontPx="16">Normal</Text>
          <Text fontPx="16" highlight="FFFF00">Yellow highlight</Text>
          <Text fontPx="16" highlight="00FFFF">Cyan highlight</Text>
        </HStack>
      </VStack>
    </Box>
  </HStack>
  <!-- fontFamily & lineSpacingMultiple -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">fontFamily:</Text>
        <Text fontPx="16" fontFamily="Noto Sans JP">Noto Sans JP</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">lineSpacingMultiple:</Text>
        <Text fontPx="14" lineSpacingMultiple="1.5">Line 1\nLine 2\nLine 3</Text>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 2: Bullet Test
// テスト対象: bullet: true, type, numberType, numberStartAt
// ============================================================
export const page2BulletXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 2: Bullet Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">bullet: true</Text>
        <Text fontPx="14" bullet="true">Item A\nItem B\nItem C</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">type: "number"</Text>
        <Text fontPx="14" bullet='{"type":"number"}'>First\nSecond\nThird</Text>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">alphaLcPeriod (a. b. c.)</Text>
        <Text fontPx="14" bullet='{"type":"number","numberType":"alphaLcPeriod"}'>Alpha\nBeta\nGamma</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">romanLcPeriod (i. ii. iii.)</Text>
        <Text fontPx="14" bullet='{"type":"number","numberType":"romanLcPeriod"}'>Roman I\nRoman II\nRoman III</Text>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">numberStartAt: 5</Text>
      <Text fontPx="14" bullet='{"type":"number","numberStartAt":5}'>Starts at 5\nContinues 6\nAnd 7</Text>
    </VStack>
  </Box>
</VStack>
`;
