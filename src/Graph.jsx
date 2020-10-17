import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            nodes: undefined,
            nodesMetadata: undefined
        };
    }

    loadVisualization(e) {
        e.preventDefault()
        console.log('loading data')
        fetch('http://localhost:3000/visualization')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { error, isLoaded, data } = this.state;
        console.log(this.state)
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>
                <button onClick={(e) => this.loadVisualization(e)}>  Load visualization </button>
            </div>;
        } else {
            return (
                <div>
                    <InteractiveForceGraph
                        className="graph"
                        zoom
                        simulationOptions={{ height: 800, width: 1200 }}
                        labelAttr="label"
                        onSelectNode={(node) => console.log(node)}
                        highlightDependencies
                    >
                        {data.nodes.map((node) => <ForceGraphNode key={node.id} node={{ id: node.id, label: `${node.id}: ${node.startDate} - ${node.endDate}` }} fill="blue" />)}
                        {data.links.map((link) => <ForceGraphLink key={link.source + '-' + link.target} link={{ source: link.source, target: link.target }} />)}
                    </InteractiveForceGraph>
                </div>
            );
        }
    }
}

export default Graph;