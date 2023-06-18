import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { Icon, MinimalButton, Position, SpecialZoomLevel, Tooltip } from '@react-pdf-viewer/core';
import { pageNavigationPlugin, RenderGoToPageProps } from '@react-pdf-viewer/page-navigation';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import './custom.css';

import disableScrollPlugin from './disableScrollPlugin';
import axios from "axios";

const baseURL = "https://mvfstagingsite.wpengine.com//wp-json/wp/v2/media/80852";

const App = () => {
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;

    const disableScrollPluginInstance = disableScrollPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;

    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
          setPost(response.data);
        });
      }, []);
      
    if (!post) return null;


    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
            <div
                className="rpv-core__viewer"
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    height: '100vh',
                    position: 'relative',
                }}
            >

                {/* Navigation */}
                <div
                    style={{
                        left: 0,
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(24px, -50%)',
                        zIndex: 1,
                        color: '#ffffff',
                    }}
                >
                    <GoToPreviousPage>
                        {(props: RenderGoToPageProps) => (
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={props.onClick}>
                                        <Icon size={16}>
                                            <path d="M18.4.5,5.825,11.626a.5.5,0,0,0,0,.748L18.4,23.5" />
                                        </Icon>
                                    </MinimalButton>
                                }
                                content={() => 'Previous page'}
                                offset={{ left: 0, top: 8 }}
                            />
                        )}
                    </GoToPreviousPage>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translate(-24px, -50%)',
                        zIndex: 1,
                        color: '#ffffff',
                    }}
                >
                    <GoToNextPage>
                        {(props: RenderGoToPageProps) => (
                            <Tooltip
                                position={Position.BottomCenter}
                                target={
                                    <MinimalButton onClick={props.onClick}>
                                        <Icon size={16}>
                                            <path d="M5.651,23.5,18.227,12.374a.5.5,0,0,0,0-.748L5.651.5" />
                                        </Icon>
                                    </MinimalButton>
                                }
                                content={() => 'Next page'}
                                offset={{ left: 0, top: 8 }}
                            />
                        )}
                    </GoToNextPage>
                </div>
                {/* Navigation End */}

                <div
                    style={{
                      alignItems: 'center',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(0, 0, 0, 0.2)',
                      borderRadius: '2px',
                      bottom: '16px',
                      display: 'flex',
                      left: '50%',
                      padding: '4px',
                      position: 'absolute',
                      transform: 'translate(-50%, 0)',
                      zIndex: 1,
                  }}
                >
                    <Toolbar>
                        {(props: ToolbarSlot) => {
                            <Tooltip 
                                position={Position.TopCenter}
                            />
                            const {
                                CurrentPageInput,
                                EnterFullScreen,
                                GoToNextPage,
                                GoToPreviousPage,
                                NumberOfPages,
                                ZoomIn,
                                ZoomOut,
                            } = props;
                            return (
                                <>
                                    <div style={{ padding: '0px 2px' }}>
                                        <ZoomOut />
                                    </div>
                                    <div style={{ padding: '0px 2px' }}>
                                        <ZoomIn />
                                    </div>
                                    <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                        <GoToPreviousPage />
                                    </div>
                                    <div style={{ padding: '0px 2px', width: '4rem' }}>
                                        <CurrentPageInput /> 
                                    </div>
                                    <div style={{ padding: '0px 2px', color: '#fff' }}>
                                         / <NumberOfPages />
                                    </div>
                                    <div style={{ padding: '0px 2px' }}>
                                        <GoToNextPage />
                                    </div>
                                    <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                        <EnterFullScreen />
                                    </div>
                                </>
                            );
                        }}
                    </Toolbar>
                </div>
                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Viewer theme='dark'
                        // fileUrl={`${process.env.PUBLIC_URL}/pdf-open-parameters.pdf`}
                        fileUrl={post.guid.rendered}
                        plugins={[toolbarPluginInstance, disableScrollPluginInstance, pageNavigationPluginInstance]}
                        defaultScale={SpecialZoomLevel.PageFit}
                    />
                </div>
            </div>
        </Worker>
    );
};

export default App;