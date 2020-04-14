### http三次握手   
TCP(Transmission Control Protocol)传输控制协议   
TCP是主机对主机层的传输控制协议，提供可靠的连接服务，采用三次握手确认建立一个连接：  
位码即tcp标志位，有6种标示：`SYN(synchronous建立联机)`、`ACK(acknowledgement确认)`、`PSH(push传送)`、`FIN(finish结束)`、`RST(reset重置)`、`URG(urgent紧急)`、`Sequence number(顺序号码)`、`Acknowledge number(确认号码)`  
三次握手（Three-way Handshake）其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备。实质上其实就是连接服务器指定端口，建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。  
刚开始客户端处于 `Closed`状态，服务端处于`Listen`状态、  
进行三次握手：   
第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN(Initial Sequence Number)。此时客户端处于 SYN_SEND状态。  
首部的同步位SYN=1,初始序号seq=x, SYN=1的报文段不能携带数据，但要消耗掉一个序号。  
第二次握手：服务器收到客户端的SYN报文后，会以自己的SYN报文作为应答，并且也是指定了自己的初始化序列号ISN(s)。同时会把客户端的ISN + 1作为ACK的值，表示自己已经收到了客户端的SYN，此时服务器处于 SYN_REVD的状态。   
`在确认报文段中SYN=1,ACK=1,确认号ack = x + 1，初始序号seq=y。`  
第三次握手：客户端收到SYN报文后，会发送一个ACK报文，当然，也是一样把服务器的ISN + 1作为ACK的值，表示已经收到了服务端的SYN报文，此时客户端处于 ESTABLISHED 状态。服务器收到ACK报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接。  
确认报文段ACK=1，确认号ack=y+1，序号seq=x+1（初始为seq=x，第二个报文段所以要+1），ACK报文段可以携带数据，不携带数据则不消耗序号。  
发送第一个SYN的一端将执行主动打开（active open），接收这个SYN并发回下一个SYN的另一端执行被动打开（passive open）。  

