"use client";

import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

// Initial sample nodes and edges
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 50, y: 50 },
    data: { label: 'Trigger' }
  }
];

const initialEdges: Edge[] = [];

export default function WorkflowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Edge | Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      const newNode: Node = {
        id: `${type}_${+new Date()}`,
        type: 'default',
        position,
        data: { label: type }
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex h-full">
      {/* Sidebar with node types */}
      <aside className="w-1/4 p-4 bg-card border-r overflow-auto">
        <h4 className="text-sm font-semibold mb-2">Workflow Toolkit</h4>
        <div className="space-y-2">
          {['Trigger', 'Send Email', 'Send SMS', 'Wait', 'Condition', 'Exit'].map((type) => (
            <div
              key={type}
              className="p-2 border rounded bg-background cursor-grab hover:bg-muted"
              draggable
              onDragStart={(event) => event.dataTransfer.setData('application/reactflow', type)}
            >
              {type}
            </div>
          ))}
        </div>
      </aside>

      {/* Main canvas area */}
      <div ref={reactFlowWrapper} className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background color="#ddd" gap={16} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
