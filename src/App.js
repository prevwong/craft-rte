import React from "react";
import {
  Provider,
  defaultTheme,
  Grid,
  View,
  Button as StyledButton,
} from "@adobe/react-spectrum";
import { Editor, Frame, Element, useEditor } from "@craftjs/core";
import { SlateSetupProvider } from "@craftjs/slate";
import { Button } from "./components/Button";
import {
  List,
  ListItem,
  RichTextEditor,
  Typography,
  Text,
} from "./components/RichTextEditor";
import { EventManager } from "./components/EventManager";
import TextIcon from "@spectrum-icons/workflow/Text";
import ButtonIcon from "@spectrum-icons/workflow/Button";

function Connector({ icon, id, connector }) {
  const { connectors } = useEditor();
  return (
    <View
      borderWidth={"thin"}
      borderColor={"gray-300"}
      paddingX={"size-100"}
      paddingY={"size-200"}
      width={"100%"}
      borderRadius={"small"}
      id={`connector-${id}`}
      ref={(dom) => {
        if (!dom) {
          return;
        }
        connectors.create(dom.UNSAFE_getDOMNode(), connector);
      }}
    >
      <Grid justifyItems={"center"}>{React.createElement(icon)}</Grid>
    </View>
  );
}

function Toolbar() {
  const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <div>
      {/*<StyledButton*/}
      {/*  variant={"cta"}*/}
      {/*  onPress={() => console.log(query.serialize())}*/}
      {/*>*/}
      {/*  Get state*/}
      {/*</StyledButton>*/}
      <StyledButton
        isDisabled={canUndo === false}
        variant={"cta"}
        onPress={() => actions.history.undo()}
      >
        Undo
      </StyledButton>
      <StyledButton
        isDisabled={canRedo === false}
        variant={"cta"}
        onPress={() => actions.history.redo()}
      >
        Redo
      </StyledButton>
    </div>
  );
}

function App() {
  return (
    <Provider theme={defaultTheme}>
      <Editor resolver={{ Button }}>
        <EventManager>
          <SlateSetupProvider
            editor={{ RichTextEditor }}
            elements={{ Typography, List, ListItem }}
            leaf={{ Text }}
          >
            <Grid columns={["200px", "3fr"]} height={"100vh"}>
              <View
                backgroundColor="gray-100"
                paddingY="size-200"
                paddingX={"size-200"}
              >
                <Grid columns={["2fr", "2fr"]} gap={"size-100"}>
                  <Connector id="text" icon={TextIcon} connector={<Button />} />
                  <Connector
                    id={"button"}
                    icon={ButtonIcon}
                    connector={<Button />}
                  />
                </Grid>
              </View>
              <View
                backgroundColor="static-white"
                paddingTop="size-800"
                paddingX={"size-450"}
              >
                <Toolbar />
                <Frame>
                  <div>
                    <RichTextEditor>
                      <Typography>
                        <Text text={""} />
                      </Typography>
                    </RichTextEditor>
                  </div>
                </Frame>
                {/*<Frame data='{"ROOT":{"type":"div","isCanvas":true,"props":{},"displayName":"Element","custom":{},"hidden":false,"nodes":["7rvgoYGqOW","HHwZabbHio","DDrU90HPs9"],"linkedNodes":{}},"jjLzeGptyl":{"type":{"resolvedName":"RichTextEditor"},"isCanvas":true,"props":{},"displayName":"RichTextEditor","custom":{},"hidden":false,"nodes":["kJPSuAA1zR"],"linkedNodes":{},"parent":"ROOT"},"kJPSuAA1zR":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["5-ichsAPAP","GuLSlOVEWE","NKendKs-1G"],"linkedNodes":{},"parent":"jjLzeGptyl"},"5-ichsAPAP":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["5MZpAhUc6B"],"linkedNodes":{},"parent":"kJPSuAA1zR"},"5MZpAhUc6B":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"5-ichsAPAP"},"GuLSlOVEWE":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["4xP5xoUWqL"],"linkedNodes":{},"parent":"kJPSuAA1zR"},"4xP5xoUWqL":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"GuLSlOVEWE"},"NKendKs-1G":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["3sPQgdIYc6","mJ6Qbyla7j"],"linkedNodes":{},"parent":"kJPSuAA1zR"},"3sPQgdIYc6":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["l3JCLHY5CV"],"linkedNodes":{},"parent":"NKendKs-1G"},"l3JCLHY5CV":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"3sPQgdIYc6"},"mJ6Qbyla7j":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["DM68aBvOyt"],"linkedNodes":{},"parent":"NKendKs-1G"},"DM68aBvOyt":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"mJ6Qbyla7j"},"MbLf33Ma94":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{},"displayName":"Button","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"ROOT"},"MzEJDEcfNw":{"type":{"resolvedName":"RichTextEditor"},"isCanvas":true,"props":{},"displayName":"RichTextEditor","custom":{},"hidden":false,"nodes":["-pQfhefhEy"],"linkedNodes":{},"parent":"ROOT"},"-pQfhefhEy":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["a5WNoSrF9Y"],"linkedNodes":{},"parent":"MzEJDEcfNw"},"a5WNoSrF9Y":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["MXval0tM09y","1057xH0OG7D"],"linkedNodes":{},"parent":"-pQfhefhEy"},"MXval0tM09y":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["ISCmYKZ29wb"],"linkedNodes":{},"parent":"a5WNoSrF9Y"},"ISCmYKZ29wb":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"MXval0tM09y"},"1057xH0OG7D":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["3BWKVtWYmn4"],"linkedNodes":{},"parent":"a5WNoSrF9Y"},"3BWKVtWYmn4":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"1057xH0OG7D"},"7rvgoYGqOW":{"type":{"resolvedName":"RichTextEditor"},"isCanvas":true,"props":{},"displayName":"RichTextEditor","custom":{},"hidden":false,"nodes":["wVc1G9vBwS"],"linkedNodes":{},"parent":"ROOT"},"wVc1G9vBwS":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["jrJfNmXcj_","5fmb_MB1ea","WTem5S9iFC"],"linkedNodes":{},"parent":"7rvgoYGqOW"},"jrJfNmXcj_":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["qiqzLK93L7"],"linkedNodes":{},"parent":"wVc1G9vBwS"},"qiqzLK93L7":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"jrJfNmXcj_"},"5fmb_MB1ea":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["HGx8D9fBOC"],"linkedNodes":{},"parent":"wVc1G9vBwS"},"HGx8D9fBOC":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"5fmb_MB1ea"},"WTem5S9iFC":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["7JPR3xRY9c","EDSk0ga-Ln"],"linkedNodes":{},"parent":"wVc1G9vBwS"},"7JPR3xRY9c":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["l2aKcbkaE8"],"linkedNodes":{},"parent":"WTem5S9iFC"},"l2aKcbkaE8":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"7JPR3xRY9c"},"EDSk0ga-Ln":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["4nAH3crQxT"],"linkedNodes":{},"parent":"WTem5S9iFC"},"4nAH3crQxT":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"EDSk0ga-Ln"},"HHwZabbHio":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{},"displayName":"Button","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"ROOT"},"DDrU90HPs9":{"type":{"resolvedName":"RichTextEditor"},"isCanvas":true,"props":{},"displayName":"RichTextEditor","custom":{},"hidden":false,"nodes":["gwnGbb01e2"],"linkedNodes":{},"parent":"ROOT"},"gwnGbb01e2":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["wXoE17UHlO"],"linkedNodes":{},"parent":"DDrU90HPs9"},"wXoE17UHlO":{"type":{"resolvedName":"List"},"isCanvas":true,"props":{},"displayName":"List","custom":{},"hidden":false,"nodes":["l2QSNIT2VWH","Q3rDpEig3ty"],"linkedNodes":{},"parent":"gwnGbb01e2"},"l2QSNIT2VWH":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["QUzBGIGHICE"],"linkedNodes":{},"parent":"wXoE17UHlO"},"QUzBGIGHICE":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 1"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"l2QSNIT2VWH"},"Q3rDpEig3ty":{"type":{"resolvedName":"ListItem"},"isCanvas":false,"props":{},"displayName":"ListItem","custom":{},"hidden":false,"nodes":["CNNia1jFnty"],"linkedNodes":{},"parent":"wXoE17UHlO"},"CNNia1jFnty":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Sub-Item 2"},"displayName":"Text","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"Q3rDpEig3ty"}}'></Frame>*/}
              </View>
            </Grid>
          </SlateSetupProvider>
        </EventManager>
      </Editor>
      <style jsx global>{`
        html,
        body,
        #root {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      `}</style>
    </Provider>
  );
}

export default App;
