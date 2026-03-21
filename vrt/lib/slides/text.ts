import { palette } from "./palette.js";

// ============================================================
// Page 1: Text Node Test
// テスト対象: fontSize, color, textAlign, bold, italic, underline, strike, highlight, fontFamily, lineHeight
// ============================================================
export const page1TextXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 1: Text Node Test</Text>
  <!-- fontSize variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">fontSize:</Text>
      <HStack gap="24" alignItems="end">
        <Text fontSize="12">12px</Text>
        <Text fontSize="18">18px</Text>
        <Text fontSize="24">24px</Text>
        <Text fontSize="36">36px</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- color variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">color:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontSize="16" color="${palette.charcoal}">charcoal</Text>
        <Text fontSize="16" color="${palette.blue}">blue</Text>
        <Text fontSize="16" color="${palette.red}">red</Text>
        <Text fontSize="16" color="${palette.green}">green</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- textAlign variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">textAlign:</Text>
      <VStack gap="4">
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontSize="14" textAlign="left">left (default)</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontSize="14" textAlign="center">center</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontSize="14" textAlign="right">right</Text>
        </Box>
      </VStack>
    </VStack>
  </Box>
  <!-- bold variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">bold:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontSize="16">Normal text</Text>
        <Text fontSize="16" bold="true">Bold text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- italic variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">italic:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontSize="16">Normal text</Text>
        <Text fontSize="16" italic="true">Italic text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- underline variations -->
  <Box padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
    <VStack gap="8">
      <Text fontSize="14" bold="true">underline:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontSize="16">Normal</Text>
        <Text fontSize="16" underline="true">Underline (bool)</Text>
        <Text fontSize="16" underline.style="wavy">Underline (wavy)</Text>
        <Text fontSize="16" underline.style="dbl" underline.color="DC2626">Underline (dbl + color)</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- strike & highlight variations -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">strike:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontSize="16">Normal</Text>
          <Text fontSize="16" strike="true">Strike text</Text>
        </HStack>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">highlight:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontSize="16">Normal</Text>
          <Text fontSize="16" highlight="FFFF00">Yellow highlight</Text>
          <Text fontSize="16" highlight="00FFFF">Cyan highlight</Text>
        </HStack>
      </VStack>
    </Box>
  </HStack>
  <!-- fontFamily & lineHeight -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">fontFamily:</Text>
        <Text fontSize="16" fontFamily="Noto Sans JP">Noto Sans JP</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">lineHeight:</Text>
        <Text fontSize="14" lineHeight="1.5">Line 1\nLine 2\nLine 3</Text>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 2: List Test (Ul / Ol)
// テスト対象: Ul, Ol, Li, numberType, numberStartAt, Li style override
// ============================================================
export const page2ListXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 2: List Test (Ul / Ol)</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">Ul (bullet)</Text>
        <Ul fontSize="14">
          <Li>Item A</Li>
          <Li>Item B</Li>
          <Li>Item C</Li>
        </Ul>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">Ol (number)</Text>
        <Ol fontSize="14">
          <Li>First</Li>
          <Li>Second</Li>
          <Li>Third</Li>
        </Ol>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">alphaLcPeriod (a. b. c.)</Text>
        <Ol fontSize="14" numberType="alphaLcPeriod">
          <Li>Alpha</Li>
          <Li>Beta</Li>
          <Li>Gamma</Li>
        </Ol>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">romanLcPeriod (i. ii. iii.)</Text>
        <Ol fontSize="14" numberType="romanLcPeriod">
          <Li>Roman I</Li>
          <Li>Roman II</Li>
          <Li>Roman III</Li>
        </Ol>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">numberStartAt: 5</Text>
        <Ol fontSize="14" numberStartAt="5">
          <Li>Starts at 5</Li>
          <Li>Continues 6</Li>
          <Li>And 7</Li>
        </Ol>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <VStack gap="8">
        <Text fontSize="14" bold="true">Li style override</Text>
        <Ul fontSize="14" color="${palette.charcoal}">
          <Li>Normal item</Li>
          <Li bold="true">Bold item</Li>
          <Li color="${palette.red}">Red item</Li>
          <Li italic="true" color="${palette.blue}">Italic blue item</Li>
        </Ul>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
