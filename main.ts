import { buildPptx } from "./src";

const xml = `
<VStack w="1280" h="720" padding='{"top":24,"bottom":24,"left":48,"right":48}' gap="24" backgroundColor="F8FAFC">
  <Text fontPx="28" bold="true" color="1E293B">Ul / Ol / Li Demo</Text>

  <HStack gap="24" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Ul (Bullet List)</Text>
        <Ul fontPx="14" color="334155">
          <Li>Item A</Li>
          <Li>Item B</Li>
          <Li>Item C</Li>
        </Ul>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Ol (Numbered List)</Text>
        <Ol fontPx="14" color="334155">
          <Li>First item</Li>
          <Li>Second item</Li>
          <Li>Third item</Li>
        </Ol>
      </VStack>
    </Box>
  </HStack>

  <HStack gap="24" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Ol (alphaLcPeriod)</Text>
        <Ol fontPx="14" color="334155" numberType="alphaLcPeriod">
          <Li>Alpha</Li>
          <Li>Beta</Li>
          <Li>Gamma</Li>
        </Ol>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Ol (numberStartAt: 5)</Text>
        <Ol fontPx="14" color="334155" numberStartAt="5">
          <Li>Starts at 5</Li>
          <Li>Continues 6</Li>
          <Li>And 7</Li>
        </Ol>
      </VStack>
    </Box>
  </HStack>

  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
    <VStack gap="8">
      <Text fontPx="18" bold="true" color="1E293B">Li Style Override</Text>
      <Ul fontPx="14" color="334155">
        <Li>Normal item</Li>
        <Li bold="true">Bold item</Li>
        <Li color="DC2626">Red item</Li>
        <Li italic="true" color="2563EB">Italic blue item</Li>
      </Ul>
    </VStack>
  </Box>
</VStack>
`;

async function main() {
  const pptx = await buildPptx(xml, {
    w: 1280,
    h: 720,
  });

  await pptx.writeFile({ fileName: "sample.pptx" });
}

main();
