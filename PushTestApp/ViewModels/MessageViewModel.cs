using Newtonsoft.Json;

namespace TestMakerFreeWebApp.ViewModels
{
  [JsonObject(MemberSerialization.OptOut)]
  public class MessageViewModel
  {
    #region Constructor 
    public MessageViewModel()
    {

    }
    #endregion

    #region Properties 
    public string AppKey { get; set; }
    public string UserKey { get; set; }
    public string Text { get; set; }
    #endregion
  }
}
